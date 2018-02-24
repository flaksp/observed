# Observed &mdash; a tool to monitor your streams' viewers count

[![Build status](https://api.travis-ci.org/ssimplix/observed.svg)](https://travis-ci.org/ssimplix/observed) [![Dependencies](https://david-dm.org/ssimplix/observed.svg)](https://david-dm.org/ssimplix/observed) [![Development dependencies](https://david-dm.org/ssimplix/observed/dev-status.svg)](https://david-dm.org/ssimplix/observed?type=dev)

Observed is a simple minimalistic JavaScript-only application that monitors your streams in popular streaming platforms and shows viewers count for each one and sum of them.

Currently supported streaming platforms:

* [Twitch](https://www.twitch.tv)
* [YouTube](https://www.youtube.com)

Services planned to be supported in the future:

* [GoodGame](https://goodgame.ru) (see issue [#1](https://github.com/ssimplix/observed/issues/1))
* [VK](https://vk.com) (see issue [#2](https://github.com/ssimplix/observed/issues/2))

## What's inside

Observed built with plain JavaScript without any frameworks.

It uses [Poi](https://poi.js.org) to gather everything.

The project is hosted on [GitHub Pages](https://pages.github.com) with [Cloudflare](https://www.cloudflare.com/) configured.

## Benchmarks

Benchmarks periodically run on remote server.

### [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

[![Google PSI speed test for desktop](https://shields.lith.pw/observed/badges/desktop-speed.svg)](https://developers.google.com/speed/pagespeed/insights/?url=https://observed.lith.pw) [![Google PSI speed test for mobile](https://shields.lith.pw/observed/badges/mobile-speed.svg)](https://developers.google.com/speed/pagespeed/insights/?url=https://observed.lith.pw&tab=mobile) 
[![Google PSI usability test for mobile](https://shields.lith.pw/observed/badges/mobile-usability.svg)](https://developers.google.com/speed/pagespeed/insights/?url=https://observed.lith.pw&tab=mobile)

### [Lighthouse](https://developers.google.com/web/tools/lighthouse/)

![Lighthouse Performance test](https://shields.lith.pw/observed/badges/performance.svg) ![Lighthouse PWA test](https://shields.lith.pw/observed/badges/pwa.svg) ![Lighthouse Accessibility test](https://shields.lith.pw/observed/badges/accessibility.svg) ![Lighthouse Best Practices test](https://shields.lith.pw/observed/badges/best-practices.svg) ![Lighthouse SEO test](https://shields.lith.pw/observed/badges/seo.svg)


## License

Observed is licensed under GPL-3.0 license. For further details see [LICENSE](LICENSE) file.
