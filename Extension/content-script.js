let hiddenFigures = [];
const mObserver = new MutationObserver(function (mutations, _observer) {
    chrome.storage.local.get(["hideRepublishes"], function (result) {
        if (!result.hideRepublishes) return;

        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'FIGURE') {
                        aEls = node.querySelectorAll('a');
                        aEls.forEach(aEl => {
                            if (aEl.href.includes('collection')) {
                                hiddenFigures.push({
                                    el: aEl.parentNode.parentNode.parentNode,
                                    displayStyle: aEl.parentNode.parentNode.parentNode.style.display
                                });
                                aEl.parentNode.parentNode.parentNode.style.display = 'none';
                            }
                        });
                    }
                });
            }
        });
    });
});

mObserver.observe(document, {
    childList: true,
    subtree: true
});

chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
    if (request.message === 'unHide') {
        sendResponse({ message: 'unHiding' });
        console.log('unHiding');
        console.log(hiddenFigures);
        hiddenFigures.forEach(hf => {
            hf.el.style.display = hf.displayStyle;
        });
        hiddenFigures = [];
    } else if (request.message === 'hide') {
        sendResponse({ message: 'hiding' });
        console.log('hiding');
        document.querySelectorAll('a').forEach(aEl => {
            if (aEl.href.includes('collection')) {
                hiddenFigures.push({
                    el: aEl.parentNode.parentNode.parentNode,
                    displayStyle: aEl.parentNode.parentNode.parentNode.style.display
                });
                aEl.parentNode.parentNode.parentNode.style.display = 'none';
            }
        });
        console.log(hiddenFigures);
    }
});



