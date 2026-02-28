"""
Authentication service — signup, login, token management.
"""
import uuid
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token
from app.core.exceptions import ConflictError, UnauthorizedError, NotFoundError
from app.schemas.auth import TokenResponse, UserResponse, AuthResponse


def _build_tokens(user_id: str) -> TokenResponse:
    access = create_access_token({"sub": user_id})
    refresh = create_refresh_token({"sub": user_id})
    return TokenResponse(
        access_token=access,
        refresh_token=refresh,
        token_type="bearer",
        expires_in=30 * 60,  # 30 minutes
    )


async def signup_user(
    db: AsyncSession, *, email: str, password: str, full_name: str
) -> AuthResponse:
    # Check for existing user
    result = await db.execute(select(User).where(User.email == email))
    if result.scalar_one_or_none() is not None:
        raise ConflictError("An account with this email already exists")

    user = User(
        id=uuid.uuid4(),
        email=email,
        password_hash=hash_password(password),
        full_name=full_name,
        tier="starter",
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    tokens = _build_tokens(str(user.id))
    return AuthResponse(user=UserResponse.model_validate(user), tokens=tokens)


async def login_user(
    db: AsyncSession, *, email: str, password: str
) -> AuthResponse:
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if user is None or not verify_password(password, user.password_hash or ""):
        raise UnauthorizedError("Invalid email or password")

    # Update last login
    user.last_login_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(user)

    tokens = _build_tokens(str(user.id))
    return AuthResponse(user=UserResponse.model_validate(user), tokens=tokens)


async def refresh_tokens(db: AsyncSession, *, user_id: str) -> TokenResponse:
    result = await db.execute(select(User).where(User.id == uuid.UUID(user_id)))
    user = result.scalar_one_or_none()
    if user is None:
        raise NotFoundError("User not found")
    return _build_tokens(str(user.id))


async def get_user_profile(db: AsyncSession, *, user_id: uuid.UUID) -> UserResponse:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise NotFoundError("User not found")
    return UserResponse.model_validate(user)
