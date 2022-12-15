from fastapi import APIRouter, Response

router = APIRouter(tags=["Logo"])


@router.get(
    "/logo",
    responses={200: {"content": {"image/png": {}}}},
    response_class=Response,
)
def logo():
    filepath = "./app/static/logo_white_bg.png"
    with open(filepath, "rb") as file:
        image_bytes = file.read()
    return Response(content=image_bytes, media_type="image/png")
