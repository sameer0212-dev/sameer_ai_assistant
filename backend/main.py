from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from auth import router as auth_router
import httpx
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sameer AI Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "status": "Backend Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "backend": "online",
        "database": "connected"
    }


class ChatRequest(BaseModel):
    message: str
    provider_token: str | None = None


@app.post("/chat")
async def chat(request: ChatRequest):

    webhook_url = "https://sameeraestics.app.n8n.cloud/webhook/f443cb9e-7724-4f7a-98c1-4c73ebe9e7c5"

    payload = {
        "message": request.message,
        "provider_token": request.provider_token,
    }

    async def generate_stream():
        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream("POST", webhook_url, json=payload) as response:
                async for chunk in response.aiter_bytes():
                    if chunk:
                        yield chunk

    return StreamingResponse(generate_stream(), media_type="text/plain")