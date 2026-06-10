from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    PROJECT_NAME: str

    PROJECT_VERSION: str

    MYSQL_USER: str

    MYSQL_PASSWORD: str

    MYSQL_HOST: str

    MYSQL_PORT: int

    MYSQL_DB: str

    SECRET_KEY: str

    ALGORITHM: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # GEMINI_API_KEY: str
    OPENROUTER_API_KEY: str

    class Config:

        env_file = ".env"


settings = Settings()