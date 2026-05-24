/* figures.js — code-copy buttons and any future figure utilities */

document.addEventListener('DOMContentLoaded', function () {

    /* ── Code copy buttons ───────────────────────────────────
       Injects a "Copy" button into every <pre> block.
       The button fades in on hover (CSS handles opacity). */
    document.querySelectorAll('pre').forEach(function (pre) {
        var btn = document.createElement('button');
        btn.className = 'code-copy-btn';
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code');

        btn.addEventListener('click', function () {
            var code = pre.querySelector('code');
            var text = code ? code.textContent : pre.textContent;
            navigator.clipboard.writeText(text).then(function () {
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(function () {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(function () {
                /* Fallback for browsers without clipboard API */
                var ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(function () {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            });
        });

        pre.appendChild(btn);
    });

});
