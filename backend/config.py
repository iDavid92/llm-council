"""Configuration for the LLM Council."""

import os
from dotenv import load_dotenv

load_dotenv()

# OpenRouter API key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Council members - list of OpenRouter model identifiers
COUNCIL_MODELS = [
    "tngtech/deepseek-r1t2-chimera:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "alibaba/tongyi-deepresearch-30b-a3b:free",
    "x-ai/grok-4.1-fast:free",
    "openrouter/bert-nebulon-alpha",
    "nousresearch/hermes-3-llama-3.1-405b:free"
]

# Chairman model - synthesizes final response
CHAIRMAN_MODEL = "x-ai/grok-4.1-fast:free"

# OpenRouter API endpoint
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Data directory for conversation storage
DATA_DIR = "data/conversations"
