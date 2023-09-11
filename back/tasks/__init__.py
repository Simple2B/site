# flake8: noqa F401
# add current directory to os.path
import os
import sys

sys.path.append(os.curdir)

from .shell import shell
from .superuser import create_superuser
from .example import time
from .db import init_db
from .add_questions import add_questions
from .telegram import tg_hello
