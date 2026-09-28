from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
TOOLS = ROOT / "tools"

def test_tools_surface_exists():
    assert all((TOOLS / name).is_file() for name in ("index.html","style.css","app.js"))

def test_tools_catalog_contains_all_mvp_slugs():
    html = (TOOLS / "index.html").read_text(encoding="utf-8")
    slugs = ["word-to-pdf","pdf-merge-split","pdf-compress","pdf-ocr-fa","pdf-image","remove-background","passport-photo","image-resize-compress","image-convert","extract-audio","media-convert","whisper-transcribe","qr-code","word-counter","password-generator"]
    assert all(f'data-slug="{slug}"' in html for slug in slugs)

def test_tools_page_has_no_internal_runtime_markers():
    for path in (TOOLS / "index.html", TOOLS / "style.css", TOOLS / "app.js"):
        text = path.read_text(encoding="utf-8").lower()
        assert "token" + "router" not in text
        assert "/home/" + "ubuntu" not in text
        assert "api_" + "key" not in text
