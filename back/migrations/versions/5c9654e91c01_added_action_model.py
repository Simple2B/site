"""added action model

Revision ID: 5c9654e91c01
Revises: 0e4692c80ffb
Create Date: 2023-08-04 15:57:31.373446

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5c9654e91c01'
down_revision = '0e4692c80ffb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('actions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('action', sa.Enum('CREATE', 'EDIT', 'DELETE', name='actionstype'), nullable=False),
    sa.Column('entity', sa.Enum('CASE', 'ADMIN', 'QUESTION', 'CANDIDATE', name='entity'), nullable=False),
    sa.Column('entity_id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['superusers.id'], name=op.f('fk_actions_user_id_superusers')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_actions'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('actions')
    # ### end Alembic commands ###
