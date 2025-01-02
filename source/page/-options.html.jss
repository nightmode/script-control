<js>
    const theme = args[0]
    const icon  = args[1]
    const page  = 'options'
</js><!doctype html>
<html lang="en" id="html">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/css/shared.css?version=2025.1.2.0">
    <link rel="preload" href="/fonts/inter.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="preload" href="/fonts/inter-medium.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="preload" href="/fonts/inter-semibold.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="preload" href="/fonts/inter-bold.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="preload" href="/fonts/kufam.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="icon" href="/images/icon/logo/logo-<js>write(icon)</js>-32.png?version=2025.1.2.0" type="image/png">
    <title>Script Control</title>
</head>
<body class="<js>write(theme)</js>">

    <div class="wrapper">
        <header>
            <js>include('/images/-logo.svg')</js>
            <h1>Script Control</h1>
        </header>

        <nav>
            <ul>
                <li class="active">
                    <a class="page active" tabindex="-1">
                        <span>Options</span>
                    </a>
                </li>
                <li>
                    <a class="page" href="/page/<js>write(theme)</js>/<js>write(icon)</js>/preferences.html">
                        <span>Preferences</span>
                    </a>
                </li>
                <li>
                    <a class="page" href="/page/<js>write(theme)</js>/<js>write(icon)</js>/about.html">
                        <span>About</span>
                    </a>
                </li>
            </ul>
        </nav>

        <div id="loading" class="loading">
            <div>
                <js>include('/images/-loading.svg')</js>
                Loading
            </div>
        </div><!-- loading -->

        <div id="content" class="content hidden">
            <js>include('/page/include/-permissions.html.jss')</js>

            <js>include('/page/include/-show-message.html.jss')</js>

            <div class="content-thin">
                <h1>Options</h1>

                <div class="box">
                    <div class="box-inner box-options">
                        <div class="options-header">
                            <h3 id="global">
                                Global
                            </h3>
                        </div><!-- options-header -->

                        <div class="options options-list">
                            <hr class="grid-col-span-3">

                            <div class="options-row">
                                <div class="options-text">
                                    <div class="options-title options-title-block options-title-strong" id="options-title-global">
                                        Allowing JavaScript globally.
                                    </div>
                                </div><!-- options-text -->

                                <div class="options-center">
                                    <div>
                                        <input type="checkbox" is="custom-checkbox" data-option-type="global" data-option="global" class="checkbox-yes checkbox-no-uncheck" value="true" title="Allow Global">
                                    </div>

                                    <div>
                                        <input type="checkbox" is="custom-checkbox" data-option-type="global" data-option="global" class="checkbox-no checkbox-no-uncheck" value="false" title="Block Global">
                                    </div>
                                </div><!-- options-center -->
                            </div><!-- options-row -->
                        </div><!-- options -->
                    </div><!-- box-inner -->
                </div><!-- box -->

                <div class="box no-margin-top">
                    <div class="box-inner box-options">
                        <div class="options-header">
                            <h3 id="domains">
                                Domains
                            </h3>

                            <div class="options-filter" id="options-filter-domains">
                                <input is="custom-filter" class="custom-filter" data-option="domains" id="options-filter-domains-text" placeholder="Filter" spellcheck="false" type="text">
                                <input class="hidden options-filter-clear" data-option="domains" id="options-filter-domains-clear" type="button" value="" aria-hidden="true">
                            </div><!-- options-filter -->

                            <div class="options-sort" id="options-sort-domains">
                                <select is="custom-select" data-option="domains">
                                    <option value="">Sort</option>
                                    <optgroup label="Domains">
                                        <option value="a-z">A&ndash;Z</option>
                                        <option value="z-a">Z&ndash;A</option>
                                    </optgroup>
                                    <optgroup label="Option">
                                        <option value="allow-block">Allow&ndash;Block</option>
                                        <option value="block-allow">Block&ndash;Allow</option>
                                    </optgroup>
                                </select>
                            </div><!-- options-sort -->
                        </div><!-- options-header -->

                        <div class="loading hidden" id="options-domains-loading">
                            <div>
                                <js>include('/images/-loading.svg')</js>
                                Loading
                            </div>
                        </div><!-- loading -->

                        <div id="options-list-area-domains">
                            <div class="options hidden" id="options-domains">
                                <!-- will be populated by javascript -->
                            </div><!-- options -->
                        </div><!-- options-list-area-domains -->

                        <div class="options-paginate hidden" id="options-paginate-domains">
                            <hr>

                            <div class="flex">
                                <div class="link">
                                    <a class="options-paginate-link" data-option-type="domains" data-option="first" href="">&lt;--</a>
                                </div>
                                <div class="link">
                                    <a class="options-paginate-link" data-option-type="domains" data-option="previous" href="">&lt;-</a>
                                </div>
                                <div class="text">
                                    <span class="text-viewing">
                                        Viewing
                                    </span>
                                    <span class="text-numbers">
                                        <!-- will be populated by javascript -->
                                    </span>
                                </div>
                                <div class="link">
                                    <a class="options-paginate-link" data-option-type="domains" data-option="next" href="">-&gt;</a>
                                </div>
                                <div class="link">
                                    <a class="options-paginate-link" data-option-type="domains" data-option="last" href="">--&gt;</a>
                                </div>
                            </div><!-- flex -->
                        </div><!-- options-paginate -->
                    </div><!-- box-inner -->
                </div><!-- box -->

                <div class="box no-margin-top">
                    <div class="box-inner box-options">
                        <div class="options-header">
                            <h3 id="domain">
                                Single Domains
                            </h3>

                            <div class="options-filter" id="options-filter-domain">
                                <input is="custom-filter" class="custom-filter" data-option="domain" id="options-filter-domain-text" placeholder="Filter" spellcheck="false" type="text">
                                <input class="hidden options-filter-clear" data-option="domain" id="options-filter-domain-clear" type="button" value="" aria-hidden="true">
                            </div><!-- options-filter -->

                            <div class="options-sort" id="options-sort-domain">
                                <select is="custom-select" data-option="domain">
                                    <option value="">Sort</option>
                                    <optgroup label="Single Domains">
                                        <option value="a-z">A&ndash;Z</option>
                                        <option value="z-a">Z&ndash;A</option>
                                    </optgroup>
                                    <optgroup label="Option">
                                        <option value="allow-block">Allow&ndash;Block</option>
                                        <option value="block-allow">Block&ndash;Allow</option>
                                    </optgroup>
                                </select>
                            </div><!-- options-sort -->
                        </div><!-- options-header -->

                        <div class="loading hidden" id="options-domain-loading">
                            <div>
                                <js>include('/images/-loading.svg')</js>
                                Loading
                            </div>
                        </div><!-- loading -->

                        <div id="options-list-area-domain">
                            <div class="options hidden" id="options-domain">
                                <!-- will be populated by javascript -->
                            </div><!-- options -->
                        </div><!-- options-list-area-domain -->

                        <div class="options-paginate hidden" id="options-paginate-domain">
                            <hr>

                            <div class="flex">
                                <div class="link">
                                    <a class="options-paginate-link" data-option-type="domain" data-option="first" href="">&lt;--</a>
                                </div>
                                <div class="link">
                                    <a class="options-paginate-link" data-option-type="domain" data-option="previous" href="">&lt;-</a>
                                </div>
                                <div class="text">
                                    <span class="text-viewing">
                                        Viewing
                                    </span>
                                    <span class="text-numbers">
                                        <!-- will be populated by javascript -->
                                    </span>
                                </div>
                                <div class="link">
                                    <a class="options-paginate-link" data-option-type="domain" data-option="next" href="">-&gt;</a>
                                </div>
                                <div class="link">
                                    <a class="options-paginate-link" data-option-type="domain" data-option="last" href="">--&gt;</a>
                                </div>
                            </div><!-- flex -->
                        </div><!-- options-paginate -->
                    </div><!-- box-inner -->
                </div><!-- box -->
            </div><!-- content-thin -->
        </div><!-- content -->
    </div><!-- wrapper -->

    <template id="template-options-domain-row">
        <hr class="grid-col-span-3">

        <div class="options-row">
            <div class="options-text">
                <span class="options-title">...</span>
                <span class="options-undo hidden">
                    <a is="custom-clear-or-undo" data-action="undo" data-option-type="domain" data-option="" href="" tabindex="0">Undo</a>
                    <span>/</span>
                    <a is="custom-clear-or-undo" data-action="clear" data-option-type="domain" data-option="" href="" tabindex="0">Clear</a>
                </span>
            </div><!-- options-text -->

            <div class="options-center">
                <div>
                    <input type="checkbox" is="custom-checkbox" data-option-type="domain" data-option="" class="checkbox-yes" value="true" title="Allow Domain">
                </div>

                <div>
                    <input type="checkbox" is="custom-checkbox" data-option-type="domain" data-option="" class="checkbox-no" value="false" title="Block Domain">
                </div>
            </div><!-- options-center -->
        </div><!-- options-row -->
    </template>

    <template id="template-options-domains-row">
        <hr class="grid-col-span-3">

        <div class="options-row">
            <div class="options-text">
                <span class="options-title">...</span>
                <span class="options-undo hidden">
                    <a is="custom-clear-or-undo" data-action="undo" data-option-type="domains" data-option="" href="" tabindex="0">Undo</a>
                    <span>/</span>
                    <a is="custom-clear-or-undo" data-action="clear" data-option-type="domains" data-option="" href="" tabindex="0">Clear</a>
                </span>
            </div><!-- options-text -->

            <div class="options-center">
                <div>
                    <input type="checkbox" is="custom-checkbox" data-option-type="domains" data-option="" class="checkbox-yes" value="true" title="Allow Domains">
                </div>

                <div>
                    <input type="checkbox" is="custom-checkbox" data-option-type="domains" data-option="" class="checkbox-no" value="false" title="Block Domains">
                </div>
            </div><!-- options-center -->
        </div><!-- options-row -->
    </template>

    <template id="template-options-domain-no-results">
        <hr class="grid-col-span-3">
        <p class="grid-col-span-3 no-margin-bottom text-center">
            No results for filter.
        </p>
    </template>

    <template id="template-options-domain-no-rules">
        <p class="grid-col-span-3 no-margin">
            To create an option for a single domain, visit a website and then use the Script Control icon in the top right of your browser to allow or block scripts for the domain you are visiting.
        </p>
    </template>

    <template id="template-options-domains-no-results">
        <hr class="grid-col-span-3">
        <p class="grid-col-span-3 no-margin-bottom text-center">
            No results for filter.
        </p>
    </template>

    <template id="template-options-domains-no-rules">
        <p class="grid-col-span-3 no-margin">
            To create an option that can affect multiple domains, visit a website and then use the Script Control icon in the top right of your browser to allow or block scripts for the <strong>*.</strong> version of the domain you are visiting.
        </p>
    </template>

    <js>include('/page/include/-scroll-nav.html')</js>

    <script src="/js/browser-polyfill.js?version=2025.1.2.0"></script>
    <script src="/js/reference.js?version=2025.1.2.0"></script>
    <script src="/js/shared.js?version=2025.1.2.0"></script>
    <script src="/js/punycode.js?version=2025.1.2.0"></script>
    <script src="/js/page/options.js?version=2025.1.2.0"></script>

    <div id="preload-images" aria-hidden="true">
        <img src="/images/icon/radio-rules/radio-rules-dark-hover-allow.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-hover-block.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-no-checked-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-no-checked.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-yes-checked-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark-yes-checked.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-dark.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-hover-allow.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-hover-block.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-no-checked-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-no-checked.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-yes-checked-hover.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light-yes-checked.svg?version=2025.1.2.0">
        <img src="/images/icon/radio-rules/radio-rules-light.svg?version=2025.1.2.0">
    </div><!-- preload-images -->

</body>
</html>