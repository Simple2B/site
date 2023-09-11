from invoke import task


@task
def tg_hello(c):
    from app import controller as c

    tg = c.TelegramBot()
    tg.hello()
