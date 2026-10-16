#!/bin/sh
# rebuild ko-i18n.js from parts: dict -> extra -> logic
cd "$(dirname "$0")" && { printf '%s\n' '/* Aside UI Korean patch v2 - light: exact-match nodeValue/attr only, childList+characterData observer, throttled+budgeted, no polling */' '(function () {' "  'use strict';"; cat dict.part.js extra.part.js logic.part.js; } > ko-i18n.js && node --check ko-i18n.js && echo BUILD_OK
