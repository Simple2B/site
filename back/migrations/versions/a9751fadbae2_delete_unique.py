"""delete unique

Revision ID: a9751fadbae2
Revises: 63a3fda1a9cd
Create Date: 2023-09-08 11:20:40.450077

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a9751fadbae2'
down_revision = '63a3fda1a9cd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('uq_cases_title', 'cases', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('uq_cases_title', 'cases', ['title'])
    # ### end Alembic commands ###
