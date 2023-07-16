import pathlib
from invoke import task

BASE_DIR = pathlib.Path(__file__).parent.resolve()
INIT_FILE = BASE_DIR / "shell_init.py"


@task
def shell(_):
    """interactive shell"""
    # First create a config object from the traitlets library
    from traitlets.config import Config

    c = Config()

    # Now we can set options as we would in a config file:
    #   c.Class.config_value = value
    # For example, we can set the exec_lines option of the InteractiveShellApp
    # class to run some code when the IPython REPL starts
    with open(INIT_FILE, "r") as f:
        c.InteractiveShellApp.exec_lines = f.readlines()
    c.InteractiveShell.colors = "LightBG"
    c.InteractiveShell.confirm_exit = False
    c.TerminalIPythonApp.display_banner = False

    # Now we start ipython with our configuration
    import IPython

    IPython.start_ipython(config=c, argv=[])
