"""Configuration for the LLM Council with roles and weights."""

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
    "nousresearch/hermes-3-llama-3.1-405b:free",
]

# Per‑modell konfiguration: roll och vikt (summan = 1.0)
COUNCIL_MODEL_CONFIG = {
    "tngtech/deepseek-r1t2-chimera:free": {
        "role": "Logiker",
        "weight": 0.15,
    },
    "meta-llama/llama-3.3-70b-instruct:free": {
        "role": "Moderator",
        "weight": 0.20,
    },
    "alibaba/tongyi-deepresearch-30b-a3b:free": {
        "role": "Researcher",
        "weight": 0.10,
    },
    "x-ai/grok-4.1-fast:free": {
        "role": "Realist",
        "weight": 0.20,
    },
    "openrouter/bert-nebulon-alpha": {
        "role": "Baseline",
        "weight": 0.05,
    },
    "nousresearch/hermes-3-llama-3.1-405b:free": {
        "role": "Filosof",
        "weight": 0.30,
    },
}

# Chairman model – synthesizes final response
CHAIRMAN_MODEL = "x-ai/grok-4.1-fast:free"

# OpenRouter API endpoint
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Data directory for conversation storage
DATA_DIR = "data/conversations"
