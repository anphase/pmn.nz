workflow "New workflow" {
  on = "push"
  resolves = ["HTTP client"]
}

action "HTTP client" {
  uses = "swinton/httpie.action@69125d73caa2c6821f6a41a86112777a37adc171"
  args = "['GET', 'https://anphase.com:8443/modules/git/public/web-hook.php?uuid=2867beed-2770-222a-a5b3-cf23923654b2']"
}
