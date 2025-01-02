<js>
    const theme = args[0]
    const icon  = args[1]
    const page  = 'preferences'
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
                <li>
                    <a class="page" href="/page/<js>write(theme)</js>/<js>write(icon)</js>/options.html">
                        <span>Options</span>
                    </a>
                </li>
                <li class="active">
                    <a class="page active" tabindex="-1">
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

            <h1>Preferences</h1>

            <div class="box">
                <div class="box-inner">
                    <h3>
                        Theme
                    </h3>

                    <p>
                        Theme for pages that are displayed inside a browser tab.
                    </p>

                    <ol class="preference-row">
                        <li>
                            <input type="radio" is="custom-radio" data-preference="theme" name="theme" value="automatic" class="radio" id="radio-theme-automatic">

                            <label for="radio-theme-automatic">
                                Automatic
                            </label>
                        </li>
                        <li>
                            <input type="radio" is="custom-radio" data-preference="theme" name="theme" value="light" class="radio" id="radio-theme-light">

                            <label for="radio-theme-light">
                                Light
                            </label>
                        </li>
                        <li>
                            <input type="radio" is="custom-radio" data-preference="theme" name="theme" value="dark" class="radio" id="radio-theme-dark">

                            <label for="radio-theme-dark">
                                Dark
                            </label>
                        </li>
                    </ol>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>
                        Popup Theme
                    </h3>

                    <p>
                        Theme for popups that do not appear inside a browser tab.
                    </p>

                    <ol class="preference-row">
                        <li>
                            <input type="radio" is="custom-radio" data-preference="theme_popup" name="theme_popup" value="automatic" class="radio" id="radio-theme-popup-automatic">

                            <label for="radio-theme-popup-automatic">
                                Automatic
                            </label>
                        </li>
                        <li>
                            <input type="radio" is="custom-radio" data-preference="theme_popup" name="theme_popup" value="light" class="radio" id="radio-theme-popup-light">

                            <label for="radio-theme-popup-light">
                                Light
                            </label>
                        </li>
                        <li>
                            <input type="radio" is="custom-radio" data-preference="theme_popup" name="theme_popup" value="dark" class="radio" id="radio-theme-popup-dark">

                            <label for="radio-theme-popup-dark">
                                Dark
                            </label>
                        </li>
                    </ol>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>Icon Color</h3>

                    <p>
                        The color of the icon inside the tab handle of a browser tab.
                    </p>

                    <ol class="preference-row">
                        <li>
                            <input type="radio" is="custom-radio" data-preference="icon_color" name="icon_color" value="automatic" class="radio" id="radio-icon-color-automatic">

                            <label for="radio-icon-color-automatic">
                                Automatic
                            </label>
                        </li>
                        <li>
                            <input type="radio" is="custom-radio" data-preference="icon_color" name="icon_color" value="light" class="radio" id="radio-icon-color-light">

                            <label for="radio-icon-color-light">
                                Light
                            </label>
                        </li>
                        <li>
                            <input type="radio" is="custom-radio" data-preference="icon_color" name="icon_color" value="dark" class="radio" id="radio-icon-color-dark">

                            <label for="radio-icon-color-dark">
                                Dark
                            </label>
                        </li>
                        <li>
                            <input type="radio" is="custom-radio" data-preference="icon_color" name="icon_color" value="blue" class="radio" id="radio-icon-color-blue">

                            <label for="radio-icon-color-blue">
                                Blue
                            </label>
                        </li>
                    </ol>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>Status Text</h3>

                    <p>
                        Display tiny text descriptions like allow and block along with the colorful status indicator in the toolbar.
                    </p>

                    <ol class="preference-row">
                        <li>
                            <input type="radio" is="custom-radio" data-preference="badge_text" name="badge_text" value="show" class="radio" id="radio-badge-text-show">

                            <label for="radio-badge-text-show">
                                Show
                            </label>
                        </li>
                        <li>
                            <input type="radio" is="custom-radio" data-preference="badge_text" name="badge_text" value="hide" class="radio" id="radio-badge-text-hide">

                            <label for="radio-badge-text-hide">
                                Hide
                            </label>
                        </li>
                    </ol>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>Global Warning</h3>

                    <p>
                        Display a visual warning when a site without specific rules is allowed globally.
                    </p>

                    <ol class="preference-row">
                        <li>
                            <input type="radio" is="custom-radio" data-preference="global_warn" name="global_warn" value="show" class="radio" id="radio-global-warn-show">

                            <label for="radio-global-warn-show">
                                Show
                            </label>
                        </li>
                        <li>
                            <input type="radio" is="custom-radio" data-preference="global_warn" name="global_warn" value="hide" class="radio" id="radio-global-warn-hide">

                            <label for="radio-global-warn-hide">
                                Hide
                            </label>
                        </li>
                    </ol>
                </div><!-- box-inner -->
            </div><!-- box -->
        </div><!-- content -->
    </div><!-- wrapper -->

    <js>include('/page/include/-scroll-nav.html')</js>

    <script src="/js/browser-polyfill.js?version=2025.1.2.0"></script>
    <script src="/js/shared.js?version=2025.1.2.0"></script>
    <script src="/js/page/preferences.js?version=2025.1.2.0"></script>

</body>
</html>