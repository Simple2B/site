"""init

Revision ID: 45a547156cbf
Revises: 
Create Date: 2023-03-17 16:41:25.492441

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '45a547156cbf'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('contact_us_data',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('email', sa.String(length=64), nullable=False),
    sa.Column('message', sa.String(length=512), nullable=False),
    sa.Column('phone', sa.String(length=12), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=512), nullable=False),
    sa.Column('correct_answer_mark', sa.Integer(), nullable=False),
    sa.Column('candidate_type', sa.Enum('developer', 'seller', name='vacancytype'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=128), nullable=False),
    sa.Column('image_url', sa.String(length=128), nullable=True),
    sa.Column('git_hub_id', sa.String(length=32), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('role', sa.Enum('candidate', 'сolleague', 'admin', name='userrole'), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('vacancies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=False),
    sa.Column('overview', sa.String(length=512), nullable=False),
    sa.Column('about', sa.String(length=512), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('type', sa.Enum('developer', 'seller', name='vacancytype'), nullable=True),
    sa.Column('slug', sa.String(length=32), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('slug')
    )
    op.create_table('candidates_resumes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cv_path', sa.String(length=128), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('offers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('vacancy_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=512), nullable=False),
    sa.ForeignKeyConstraint(['vacancy_id'], ['vacancies.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('properties',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('vacancy_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=64), nullable=False),
    sa.Column('value', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['vacancy_id'], ['vacancies.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('skills',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('vacancy_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=512), nullable=False),
    sa.ForeignKeyConstraint(['vacancy_id'], ['vacancies.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('variant_answers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=True),
    sa.Column('text', sa.String(length=128), nullable=False),
    sa.Column('answer_mark', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_answers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('resume_id', sa.Integer(), nullable=True),
    sa.Column('answer_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['answer_id'], ['variant_answers.id'], ),
    sa.ForeignKeyConstraint(['resume_id'], ['candidates_resumes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_answers')
    op.drop_table('variant_answers')
    op.drop_table('skills')
    op.drop_table('properties')
    op.drop_table('offers')
    op.drop_table('candidates_resumes')
    op.drop_table('vacancies')
    op.drop_table('users')
    op.drop_table('questions')
    op.drop_table('contact_us_data')
    # ### end Alembic commands ###