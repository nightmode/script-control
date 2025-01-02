<js>
    const theme = args[0]
    const icon  = args[1]
</js><!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/css/popup.css?version=2025.1.2.0">
    <link rel="preload" href="/fonts/inter.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="preload" href="/fonts/inter-medium.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="preload" href="/fonts/inter-semibold.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="icon" href="/images/icon/logo/logo-<js>write(icon)</js>-32.png?version=2025.1.2.0" type="image/png">
    <title>Script Control</title>
</head>
<body class="popup <js>write(theme)</js>">

    <div class="popup-card">
        <div id="popup-wrapper"><!-- javascript will add the class "visible" to this div when ready -->
            <div class="popup-options">
                <div class="popup-options-row">
                    <div class="popup-options-title">
                        Global
                    </div>

                    <div class="popup-options-center">
                        <div>
                            <input type="checkbox" is="custom-checkbox" data-option="global" class="checkbox-yes checkbox-no-uncheck" value="true" title="Allow Global">
                        </div>

                        <div>
                            <input type="checkbox" is="custom-checkbox" data-option="global" class="checkbox-no checkbox-no-uncheck" value="false" title="Block Global">
                        </div>
                    </div><!-- popup-options-center -->
                </div><!-- popup-options-row -->

                <div class="popup-options-row" id="popup-options-row-domains">
                    <div class="popup-options-title" id="popup-options-title-domains" >
                        *.domain
                    </div>

                    <div class="popup-options-center">
                        <div>
                            <input type="checkbox" is="custom-checkbox" data-option="domains" class="checkbox-yes" value="true" title="Allow Domains">
                        </div>

                        <div>
                            <input type="checkbox" is="custom-checkbox" data-option="domains" class="checkbox-no" value="false" title="Block Domains">
                        </div>
                    </div><!-- popup-options-center -->
                </div><!-- popup-options-row -->

                <div class="popup-options-row" id="popup-options-row-domain">
                    <div class="popup-options-title" id="popup-options-title-domain">
                        domain
                    </div>

                    <div class="popup-options-center">
                        <div>
                            <input type="checkbox" is="custom-checkbox" data-option="domain" class="checkbox-yes" value="true" title="Allow Domain">
                        </div>

                        <div>
                            <input type="checkbox" is="custom-checkbox" data-option="domain" class="checkbox-no" value="false" title="Block Domain">
                        </div>
                    </div><!-- popup-options-center -->
                </div><!-- popup-options-row -->

                <div class="popup-options-row hidden" id="popup-options-row-special">
                    <div class="popup-options-title" id="popup-options-title-special">
                        Special
                    </div>

                    <div class="popup-options-center">
                        <div>
                            <input type="checkbox" is="custom-checkbox" data-option="special" class="checkbox-yes checkbox-no-uncheck" id="checkbox-special" value="true" checked>
                        </div>

                        <div>
                            <!-- empty -->
                        </div>
                    </div><!-- popup-options-center -->
                </div><!-- popup-options-row -->
            </div><!-- popup-options -->

            <hr>

            <p id="popup-summary" class="popup-summary">
                <!-- will be populated by javascript -->
            </p>
        </div><!-- popup-wrapper -->

        <div id="loading"><!-- javascript will add the class "hidden" here once options are ready for use -->
            <div>
                <js>include('/images/-loading.svg')</js>
                Loading
            </div>
        </div><!-- loading -->
    </div><!-- popup-card -->

    <p class="popup-footer">
        <strong>Script Control</strong>
        <a href="/page/<js>write(theme)</js>/<js>write(icon)</js>/options.html" id="link-options">
            <span>Options</span>
        </a>
    </p>

    <script src="/js/browser-polyfill.js?version=2025.1.2.0"></script>
    <script src="/js/reference.js?version=2025.1.2.0"></script>
    <script src="/js/shared.js?version=2025.1.2.0"></script>
    <script src="/js/punycode.js?version=2025.1.2.0"></script>
    <script src="/js/page/popup.js?version=2025.1.2.0"></script>

    <div id="preload-images" aria-hidden="true">
        <img src="/images/icon/radio-rules/radio-rules-dark-hover-allow.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-hover-block.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-no-checked-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-no-checked.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-no-default-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-no-default.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-no-warning-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-no-warning.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-yes-checked-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-yes-checked.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-yes-default-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-yes-default.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-yes-warning-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-yes-warning.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-hover-allow.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-hover-block.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-no-checked-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-no-checked.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-no-default-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-no-default.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-no-warning-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-no-warning.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-yes-checked-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-yes-checked.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-yes-default-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-yes-default.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-yes-warning-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-yes-warning.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light.svg?version=2025.1.2.0">
    </div><!-- preload-images -->

</body>
</html>