from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

def test_public_docs_route_exists():
    page = ROOT / 'docs' / 'index.html'
    assert page.is_file()
    text = page.read_text(encoding='utf-8')
    assert 'Public Documentation' in text
    assert 'https://aicp-chat-clean.aicp-farid.workers.dev/tools/' in text

def test_main_nav_has_tools_and_docs():
    text = (ROOT / 'index.html').read_text(encoding='utf-8')
    assert 'https://aicp-chat-clean.aicp-farid.workers.dev/tools/' in text
    assert 'href="./docs/"' in text
