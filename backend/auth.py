from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from supabase_client import supabase

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.get("/login")
def login():
    auth_url = supabase.auth.sign_in_with_oauth(
        {
            "provider": "google",
            "options": {
                "redirect_to": "https://sameeraiassistant-production.up.railway.app/auth/callback"
            }
        }
    )

    return RedirectResponse(auth_url.url)


@router.get("/callback")
def callback():
    return {
        "message": "OAuth callback reached successfully!"
    }