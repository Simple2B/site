from fastapi import FastAPI
from fastapi.routing import APIRoute
from fastapi.middleware.cors import CORSMiddleware
from app.router import user, contact_us, questions


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

# sql_admin = Admin(
#     app=app,
#     engine=engine,
#     authentication_backend=admin.authentication_backend,
# )

# for view in (
#     admin.UserView,
#     admin.VacancyView,
# ):
#     sql_admin.add_view(view)


app.include_router(user.router)
# app.include_router(contact_us.router)
app.include_router(questions.router)


@app.get("/", tags=["Home"])
def root():
    SAMPLE_ENV_VAR = settings.SAMPLE_ENV_VAR
    return {"ENV": SAMPLE_ENV_VAR}
