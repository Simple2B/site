import pytest
from app.config import get_settings
from app.controller import OdooClient

IS_ENABLED = len(get_settings().ODOO_PASSWORD) > 0


@pytest.mark.skipif(not IS_ENABLED, reason="Odoo is not enabled")
def test_odoo_controller():
    odoo = OdooClient()
    odoo.update_uid("nchernov@gmail.com", "elmo054")
    assert odoo.uid == 7
