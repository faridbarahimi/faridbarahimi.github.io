from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
TOOLS = ROOT / "tools"

CURRENT_KEYS = [
    "PDF","DOC_CONVERT","TEXTPDF","HTMLPDF","P2W","MERGE","SPLIT","ROTATE","ZIP","OCR","LOCK","UNLOCK","EDIT","SIGN","FORM","DEL","CROP","WATER","CUT","ID","SIZE","CMP","FMT","IMG_CROP","IMG_WM","PDFJPG","PDFTXT","PDFXLS","PDFPPT","AUDIO","MUSIC","MEDIA","WH","TRIM","QR","TXT","TRANSLATE","KEY","CLEAN","JSON","PAGES","REORDER","DUP","REPAIR","SHARP","BGVIDEO","CONTACT","AUDIOCUT","AUDIOCMP","THUMB","BASE64","UNITS",
]

def test_tools_surface_exists():
    assert all((TOOLS / name).is_file() for name in ("index.html","style.css","app.js"))

def test_tools_catalog_matches_current_kashkool_registry():
    js = (TOOLS / "app.js").read_text(encoding="utf-8")
    match = re.search(r"const tools=\[(.*?)\];", js, re.S)
    assert match, "Kashkool registry not found"
    keys = re.findall(r"\['([^']+)'", match.group(1))
    assert keys == CURRENT_KEYS
    assert len(keys) == 52

def test_tools_page_has_no_internal_runtime_markers():
    for path in (TOOLS / "index.html", TOOLS / "style.css", TOOLS / "app.js"):
        text = path.read_text(encoding="utf-8").lower()
        assert "token" + "router" not in text
        assert "/home/" + "ubuntu" not in text
        assert "api_" + "key" not in text
