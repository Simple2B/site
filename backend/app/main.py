from fastapi import FastAPI
from fastapi.routing import APIRoute
from fastapi.middleware.cors import CORSMiddleware
from app.router import user, auth, logo, vacancy, messages
from .config import settings


def custom_generate_unique_id(router: APIRoute):
    return f"{router.tags[0]}-{router.name}"


app = FastAPI(
    title=settings.SERVER_NAME,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(logo.router)
app.include_router(vacancy.router)
app.include_router(messages.router)


@app.get("/", tags=["Home"])
def root():
    SAMPLE_ENV_VAR = settings.SAMPLE_ENV_VAR
    return {"ENV": SAMPLE_ENV_VAR}
