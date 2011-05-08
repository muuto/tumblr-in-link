var isCustomize = (window.location.href.indexOf("safe.tumblr.com") >= 0) ? true : false;
var disqusEnabled = (typeof disqusEnabled === "undefined") ? false : true;
var lteIE8 = $("html").is(".lte-ie8") ? true : false;
var showFollowing = (typeof showFollowing === "undefined") ? false : true;
var showTweets = (typeof showTweets === "undefined") ? false : true;
var showTwitterProfile = (typeof showTwitterProfile === "undefined") ? false : true;
var isPermalink = (typeof isPermalink === "undefined") ? false : true;
var collapseNotes = (typeof collapseNotes === "undefined") ? false : true;
var fixedBar = (typeof fixedBar === "undefined") ? false : true;
var followedRows = (typeof followedRows === "undefined") ? 3 : followedRows;
var flashPhotosets = (typeof flashPhotosets === "undefined") ? false : true;
var infiniteScroll = (typeof infiniteScroll === "undefined") ? false : true;
var isAppleDevice = (navigator.platform == "iPad" || navigator.platform == "iPhone" || navigator.platform == "iPod") ? true : false;
var fancyboxArgs = {
    type: "image",
    padding: 0,
    overlayColor: "#000",
    overlayOpacity: 0.85,
    titlePosition: "outside",
    titleFormat: function (a) {
        return a
    }
};
var sliderArgs = {
    container: "slides",
    autoHeight: true,
    generatePagination: false,
    effect: "slide"
};

   
jQuery.noConflict();
(function (e) {
    e(document).ready(function () {
        h();
        var p = e("#header");
        if (isAppleDevice) {
            fixedBar = false
        }
        if (fixedBar) {
            var m = false,
                l = false;
            var k = 750;
            var n = false;
            var j = true;
            var o = e(window).scrollTop();
            if (o > k) {
                n = true;
                j = false;
                p.removeClass("pinned").addClass("fixed").css({
                    top: "0px"
                }).find(".shadow").show()
            }
        }
        if (showFollowing) {
            b()
        }
        if (showTweets && twitterUsername !== "") {
            a()
        }
        if (isPermalink) {
            d()
        }
        if (disqusEnabled) {
            i()
        }
        if (searchValue !== "") {
            e("#search-form").find("input").val(searchValue).focus(function () {
                if (e(this).val() == searchValue) {
                    e(this).val("")
                }
            }).blur(function () {
                if (e(this).val() == "") {
                    e(this).val(searchValue)
                }
            })
        }
        e(".share-btn").live("click", function (u) {
            u.preventDefault();
            e(".share-box:not(this)").hide();
            var t = e(this).attr("data-permalink");
            var w = e(this).next(".share-box");
            var s = w.find(".tweet-button");
            var v = w.find(".like-button");
            w.show().find(".shortlink").focus();
            if (s.length > 0) {
                var r = e("<a>", {
                    href: "http://twitter.com/share",
                    "class": "twitter-share-button",
                    "data-via": twitterUsername,
                    "data-url": t,
                    "data-related": "gcfranco:Effector Theme Designer",
                    "data-count": "none"
                });
                s.replaceWith(r);
                var q = new twttr.TweetButton(r.get(0));
                q.render()
            }
            if (v.length > 0) {
                v.replaceWith('<iframe class="facebook-like-button" src="http://www.facebook.com/plugins/like.php?href=' + t + '&amp;layout=button_count&amp;show_faces=false&amp;width=90&amp;action=like&amp;colorscheme=light&amp;height=20" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:20px;" allowTransparency="true"></iframe>')
            }
        });
        e(document).mousedown(function (q) {
            if (!e(q.target).parents(".share-box").get(0)) {
                e(".share-box").hide()
            }
        });
        e(".shortlink").live("click", function () {
            e(this).focus().select()
        });
        e(".photo-panel").live("mouseenter", function () {
            e(this).find(".photo-btns").stop(true, true).fadeIn(150)
        }).live("mouseleave", function () {
            e(this).find(".photo-btns").stop(true, true).fadeOut(150)
        });
        e(".type-photoset").find(".photo-panel").find("a.lightbox").live("click", function () {
            e(this).parent().prev("a:has(img)").click();
            return false
        });
		e(window).load(function() {
    			e('#slider').nivoSlider({
    				controlNavThumbs:true,
    				controlNavThumbsFromRel:true
    			});
				e("#accordionGiftLelo").msAccordion({vertical:true, event:'mouseover'});
    			e("#top-wrapper").show("slow");
    			e("#tabs-wrapper").show("slow");
    			e("#tabs").tabs();

		});
        e(window).scroll(function () {
            if (fixedBar) {
                o = e(window).scrollTop();
                if (o > k) {
                    if (!n) {
                        if (l !== false) {
                            clearTimeout(l);
                            clearTimeout(m)
                        }
                        n = true;
                        j = false;
                        l = setTimeout(function () {
                            p.stop(true, true).removeClass("pinned").addClass("fixed").css({
                                top: "-50px"
                            }).animate({
                                top: "0px"
                            }, 300).find(".shadow").show()
                        }, 100)
                    }
                } else {
                    if (o < k) {
                        if (!j) {
                            if (m !== false) {
                                clearTimeout(l);
                                clearTimeout(m)
                            }
                            n = false;
                            j = true;
                            m = setTimeout(function () {
                                p.stop(true, true).animate({
                                    top: "-60px"
                                }, 300, function () {
                                    e(this).hide().css({
                                        top: "30px"
                                    }).find(".shadow").hide().end().removeClass("fixed").addClass("pinned").fadeIn("fast")
                                })
                            }, 100)
                        }
                    }
                }
            }
        });
        if ((window.location.href.indexOf("/page/") > -1) || isAppleDevice) {
            infiniteScroll = false;
            e("body").removeClass("infscroll")
        }
        if (infiniteScroll && !isPermalink) {
            e("#content").infinitescroll({
                navSelector: "#pagination",
                nextSelector: "#pagination a.next",
                itemSelector: ".post",
                loadingImg: "http://static.tumblr.com/xgwqnql/iLQleupcf/infscroll_loader.gif",
                loadingText: "",
                donetext: "No more posts to load."
            }, function (r, q) {
                e(r).eq(0).before('<div class="page-sep">Page ' + q + "</div>");
                h(e(r), true);
                if (disqusEnabled) {
                    i()
                }
            })
        }
    });

    function h(j, k) {
        var l = j ? j : e(".post:not(.loaded)");
        l.each(function () {
            var z = e(this);
            var x = z.attr("id").split("-")[1];
            if (z.hasClass("type-photo")) {
                f(z)
            }
            if (z.hasClass("type-photoset")) {
                if (flashPhotosets) {
                    var q = z.find(".media");
                    if (k) {
                        var r = q.find(".js-string").html();
                        var A = /\\\\x3cembed.+\\x3c\/embed\\\\x3e/;
                        var m = r.match(A)[0].replace(/\\\\/g, "\\").replace(/\\x3cembed/, "\x3cembed wmode=\x22opaque\x22");
                        q.append('<script type="text/javascript">replaceIfFlash(9, "photoset_' + x + "\",'" + m + "')<\/script>").find(".js_string").remove();
                        g(z)
                    } else {
                        var m = q.find("embed");
                        var s = parseInt(m.attr("width")) / parseInt(m.attr("height"));
                        var y = contentWidth / s;
                        var v = m.parent().html();
                        var C = v.replace(/<embed\s/i, "<embed wmode='opaque' ");
                        q.html(C).find("embed").css({
                            width: contentWidth,
                            height: y
                        }).parent().removeClass("loading")
                    }
                } else {
                    c(z)
                }
            }
            if (z.hasClass("type-audio")) {
                if (!isAppleDevice) {
                    if (k) {
                        var n = z.find(".player-btn").css("visibility", "hidden");
                        var r = z.find(".js-string").html();
                        var A = /\\x3cembed.+\\x3c\/embed\\x3e/;
                        var m = r.match(A)[0].replace(/\\x3cembed/, "\x3cembed wmode=\x22opaque\x22");
                        n.append('<script type="text/javascript">replaceIfFlash(9,"audio_player_' + x + "\",'\x3cdiv class=\x22audio_player\x22\x3e" + m + "\x3c/div\x3e')<\/script>").css("visibility", "visible");
                        z.find(".js-string").remove()
                    } else {
                        var t = z.find(".audio_player");
                        var v = t.html();
                        var C = v.replace(/<embed\s/i, "<embed wmode='opaque' ");
                        t.html(C);
                        z.find(".js-string").remove()
                    }
                }
            }
            if (z.hasClass("type-video")) {
                if (k) {
                    var q = z.find(".media");
                    if (/span id="?video_player/i.test(q.html())) {
                        var r = z.find(".js-string").html();
                        var u = r.split("x22video_player_" + x + "\\x22,")[1].replace(/\\'/g, "'").replace(/\\\\x26/g, "\x26").replace(/'\)\\x3c\/script\\x3e'/, "");
                        q.append('<script type="text/javascript">renderVideo("video_player_' + x + '", ' + u + "')<\/script>")
                    }
                }
                g(z)
            }
            if (z.hasClass("type-quote")) {
                var D = z.find(".quote-text");
                var o = D.find(":first-child");
                var B = D.find(":last-child");
                var w = '<span class="ldquo">&ldquo;</span>';
                var p = '<span class="rdquo">&rdquo;</span>';
                if (o.length > 0) {
                    o.prepend(w)
                } else {
                    D.prepend(w)
                }
                if ((B.length > 0) && (/<\/[a-zA-Z]+>$/.test(D.html()))) {
                    B.append(p)
                } else {
                    D.append(p)
                }
            }
            z.addClass("loaded")
        })
    }
    function c(r) {
        var n, q;
        var k = r.attr("id").split("-")[1];
        var l = (r.hasClass("tag_masonify") && contentWidth > 500) ? true : false;
        var m = r.find(".media");
        var o = {
            animationStart: function () {
                e("#photoset-" + k + " .caption").animate({
                    height: "0"
                }, 200)
            },
            animationComplete: function () {
                e("#photoset-" + k + " .caption").animate({
                    height: "40px"
                }, 200)
            }
        };
        var p = function () {
                if (!photosets["photoset_" + k]) {
                    var s = r.find(".js-string").html().match(/\\x3cdiv.+div\\x3e/)[0].replace(/\\x22/g, '"').replace(/\\x3c/g, "<").replace(/\\x3e/g, ">");
                    var w = e("<div>").html(s)
                } else {
                    var w = e("<div>").html(photosets["photoset_" + k])
                }
                var v = w.find(".photoset_photo");
                var t = w.find(".html_photoset");
                var u = {
                    posts: [{
                        id: k + "",
                        photos: []
                    }]
                };
                v.each(function (y) {
                    var z = e(this).attr("src");
                    var x = t.find(".photoset_caption").eq(y).text();
                    u.posts[0].photos.push({
                        "photo-url-1280": z,
                        "photo-url-500": z,
                        caption: x
                    })
                });
                j(u)
            };
        e.ajax({
            url: "/api/read/json?id=" + k + "&callback=?",
            type: "get",
            dataType: "json",
            success: function (s) {
                if (!s.posts) {
                    p();
                    return
                }
                j(s)
            },
            error: p
        });
        e.each(r.find(".tag-list").find("li"), function (s) {
            if (/masonify/i.test(e(this).text())) {
                e(this).hide()
            }
        });

        function j(y) {
            var A = "{{#posts}}{{#photos}}";
            A += '<div class="{{get_panel_class this}}"><a class="photo" href="{{high_res_url this}}" title="{{get_caption this}}" rel="gallery-{{../id}}"></a>';
            A += "{{> buttons }}" + ((!l) ? "{{{div_caption this}}}" : "") + "</div>";
            A += "{{/photos}}{{save_images this}}{{/posts}}";
            var C = Handlebars.compile(A);
            var t = e('<div id="photoset-' + k + '" class="' + ((l) ? "bricks" : "slides") + '"></div>');
            m.html(t.append(C(y))).find(".photo-panel a[rel^=gallery]").fancybox(fancyboxArgs);
            var B = m.data("gallery");
            var w = 0;
            var u = e("#photoset-" + k);
            for (var z = 0, v = B.length; z < v; z++) {
                var x = new Image();
                var s = B[z].src;
                e(x).data("loaded", false).attr("src", s).appendTo(u.find(".photo-panel:nth-child(" + (z + 1) + ") .photo")).load(function () {
                    e(this).data("loaded", true);
                    w += 1;
                    if (w == B.length) {
                        if (l) {
                            u.doMasonry().parent().removeClass("loading")
                        } else {
                            m.append('<div class="navi"><a href="#" class="prev"><span>Previous</span></a><a href="#" class="next"><span>Next</span></a></div>').slides(e.extend(sliderArgs, o)).removeClass("loading")
                        }
                    }
                }).error(function () {
                    e(this).hide().after('<img src="http://static.tumblr.com/njty47g/7vOlf3ism/image_fail.gif" alt="Sorry, there was a problem loading this image. Please check your photoset."/>').parent().next(".photo-btns").remove();
                    e(this).trigger("load")
                }).each(function () {
                    if (lteIE8 && this.complete && !e(this).data("loaded")) {
                        e(this).trigger("load")
                    }
                })
            }
        }
    }
    function f(l) {
        var j = l.find(".photo-panel");
        var k = j.find("img");
        var n = j.find(".lightbox");
        var m = k.parent("a");
        k.addClass("shadowed");
        n.fancybox(fancyboxArgs);
        if (m.length > 0) {
            if (m.attr("href") == n.attr("href")) {
                m.click(function () {
                    n.click();
                    return false
                })
            } else {
                e("<a>", {
                    "class": "photo-link-url",
                    href: m.attr("href"),
                    text: "Go to Link"
                }).prependTo(j.find(".photo-btns"));
                if (n.length > 0) {
                    m.click(function () {
                        n.click();
                        return false
                    })
                }
            }
        }
    }
    function g(u) {
        function t(w, D) {
            if (D == "css") {
                var C = parseInt(w.css("width")) / parseInt(w.css("height"))
            } else {
                if (D == "attr") {
                    var C = parseInt(w.attr("width")) / parseInt(w.attr("height"))
                }
            }
            return Math.round(q / C)
        }
        u.find(".js-string").remove();
        var q = contentWidth;
        var o = u.find(".media");
        var j = o.find("embed");
        var B = o.find("object");
        var p = o.find("iframe");
        var s = o.html();
        var n = /src="?http:\/\/www\.youtube\.com/i.test(s);
        var y = /src="?http:\/\/player\.vimeo\.com/i.test(s);
        if (n) {
            if (B.length > 0) {
                if (/wmode="?(opaque|transparent)/gi.test(s) == -1) {
                    s = s.replace(/<embed/i, '<param name="wmode" value="opaque" /><embed wmode="opaque"')
                }
                var r = /rel=0([a-zA-Z0-9-_&=;\/])+(?="?)/gi;
                var A = "rel=0&color1=0xFFFFFF&color2=0xFFFFFF&showinfo=0&egm=0&" + ((contentWidth > 500) ? "hd=1" : "hd=0");
                s = s.replace(r, A);
                var k = s.match(/http:\/\/(www)?.youtube.com\/([a-zA-Z0-9\/\-_])+(?=&amp;|&)/i)[0];
                var m = /\/v\/([0-9A-Za-z-_]*)/;
                var x = k.match(m);
                var l = Math.floor(q * 0.75 + 25);
                var z = Math.floor(q * 0.5625 + 25);
                e.getJSON("http://gdata.youtube.com/feeds/api/videos/" + x[1] + "?v=2&alt=json-in-script&callback=?", function (w) {
                    oldWidth = /width="?([0-9]*)"?/g;
                    newWidth = 'width="' + q + '"';
                    oldHeight = /height="?([0-9]*)"?/g;
                    if (w.entry.media$group.yt$aspectRatio != null) {
                        t = 'height="' + z + '"'
                    } else {
                        t = 'height="' + l + '"'
                    }
                    s = s.replace(oldHeight, t);
                    s = s.replace(oldWidth, newWidth);
                    o.html(s)
                })
            } else {
                if (p.length > 0) {
                    o.html('<iframe class="youtube-player" src="' + p.attr("src") + '&wmode=opaque" width="' + q + '" height="' + t(p, "attr") + '" frameborder="0" type="text/html"></iframe>')
                }
            }
        } else {
            if (y) {
                o.html('<iframe src="' + p.attr("src") + "?title=0&byline=0&portrait=0&color=" + themeColor.replace("#", "") + '" width="' + q + '" height="' + t(p, "attr") + '" frameborder="0"></iframe>')
            } else {
                if (p.length > 0) {
                    var v = t(p, "attr");
                    p.css("width", q).css("height", v)
                } else {
                    if (j.length > 0) {
                        var v = t(j, "css");
                        j.attr("wmode", "opaque").wrap("<div></div>");
                        j.css("width", q).css("height", v);
                        j.parent().css("width", q).css("height", v);
                        if (j.parent().parent().is("object")) {
                            j.parent().parent().css("width", q).css("height", v)
                        }
                    } else {
                        if (B.length > 0 && B.not(":has(embed)")) {
                            if (!e.support.htmlSerialize) {
                                B.replaceWith(B.attr("altHtml"))
                            }
                            var j = o.find("embed");
                            var v = t(j, "css");
                            j.css("width", q).css("height", v);
                            j.attr("wmode", "opaque")
                        }
                    }
                }
            }
        }
        o.removeClass("loading")
    }
    function d() {
        var l = 300;
        var j = e("ol.notes");
        var k = e("#notes-toggle");
        k.toggle(function () {
            j.slideUp(l * 1.5);
            e(this).find(".label").text("Show").next("span").removeClass("up")
        }, function () {
            j.slideDown(l * 1.5);
            e(this).find(".label").text("Hide").next("span").addClass("up")
        });
        if (collapseNotes && (window.location.href.indexOf("#notes") == -1)) {
            k.click()
        }
        e("#content").find(".meta-list").find("li.notes a").click(function (m) {
            m.preventDefault();
            if (e("#notes").find("ol.notes").is(":not(:visible)")) {
                k.click()
            }
        })
    }
    function b() {
        var m = e("#followed");
        var o = m.find("#followed-list");
        var n = o.children("li").size();
        m.find("h2").append(" <span>(" + n + ")</span>");
        if (n <= (followedRows * 5)) {
            return true
        }
        var l = m.find("#followed-wrap");
        var j = followedRows * o.find("li").eq(0).outerHeight(true);
        var k = l.outerHeight(true);
        l.css("height", j + "px");
        e("<a>", {
            "class": "show-more-followed",
            href: "#",
            html: "Show All &darr;"
        }).appendTo(m).toggle(function () {
            l.css({
                height: k + "px"
            });
            e(this).html("Show Less &uarr;")
        }, function () {
            l.css({
                height: j + "px"
            });
            e(this).html("Show All &darr;")
        })
    }
    function i() {
        var k = "?";
        var j = e("li.comments a");
        j.each(function (l) {
            if (e(this).attr("href").indexOf("#disqus_thread") >= 0) {
                k += "url" + l + "=" + encodeURIComponent(this.href) + "&"
            }
        });
        e.getScript("http://disqus.com/forums/" + disqusShortname + "/get_num_replies.js" + k, function () {
            j.each(function (l) {
                e(this).prepend('<span class="icon"></span>').parent().removeClass("hidden")
            })
        })
    }
    function a() {
        e.ajax({
            url: "http://" + tumblrUsername + ".tumblr.com/tweets.js",
            dataType: "script",
            success: function () {
                if (typeof tumblrTweets == "undefined") {
                    recent_tweets()
                }
            },
            error: recent_tweets
        })
    }
    e.fn.doMasonry = function () {
        var j = contentWidth / 2;
        e(this).masonry({
            columnWidth: j
        });
        return this
    };
    Handlebars.registerPartial("buttons", '<div class="photo-btns"><a class="lightbox" href="#">Pop-up</a><a class="photo-url" href="{{high_res_url this}}">View Separately</a></div>');
    Handlebars.registerHelper("high_res_url", function (j) {
        return j["photo-url-1280"]
    });
    Handlebars.registerHelper("get_panel_class", function (j) {
        return (j.caption.indexOf("2col") >= 0) ? "photo-panel span2col" : "photo-panel"
    });
    Handlebars.registerHelper("get_caption", function (j) {
        return j.caption.replace(/\s?2col:?\s?/, "")
    });
    Handlebars.registerHelper("div_caption", function (k) {
        var j = k.caption.replace(/\s?2col:?\s?/, "");
        return (j.length > 0) ? '<div class="caption">' + j + "</div>" : ""
    });
    Handlebars.registerHelper("save_images", function (n) {
        var v = [];
        var m = n.id;
        var x = n.photos;
        var o = e("#post-" + m).hasClass("tag_masonify") ? true : false;
        var q = e("#post-" + m + " .media");
        for (var w = 0, u = x.length; w < u; w++) {
            var k;
            var l = x[w];
            var r = l["photo-url-1280"];
            var s = l["photo-url-500"];
            var t = l.caption.indexOf("2col") >= 0 ? true : false;
            if (contentWidth > 500) {
                if (o) {
                    k = t ? r : s
                } else {
                    k = r
                }
            } else {
                k = s
            }
            v.push({
                src: k
            })
        }
        q.data("gallery", v)
    });
    e.preloadImages = function () {
        for (var j = 0; j < arguments.length; j++) {
            img = new Image();
            img.src = arguments[j]
        }
    };
    e.preloadImages("http://static.tumblr.com/xgwqnql/fMLlbpj9t/header_shadow.png", "http://static.tumblr.com/njty47g/Omoleufdi/topbar_bg.png", "http://static.tumblr.com/njty47g/x1Ild1iih/photo_btns_med.png")
})(window.jQuery);

function recent_tweets(f) {
    tumblrTweets = true;
    numTweets = (numTweets > 4) ? 4 : numTweets;
    Handlebars.registerHelper("tweet_text", function (a) {
        return linkifyTweet(a.text)
    });
    Handlebars.registerHelper("timeago", function (a) {
        return relative_time(a.created_at)
    });
    Handlebars.registerHelper("tweet_permalink", function (a) {
        return "http://www.twitter.com/" + twitterUsername + "/status/" + a.id_str
    });
    var c = '{{#each this}}<li><p class="tweet">{{{tweet_text this}}} <span class="tweet-meta"><a class="timestamp" href="{{tweet_permalink this}}" time="{{created_at}}" target="_blank">{{timeago this}}</a> &bull; <a class="reply" href="http://twitter.com/?status=@' + twitterUsername + "%20&in_reply_to_status_id={{{id_str}}}&in_reply_to=" + twitterUsername + '" target="_blank">Reply</a></span></p></li>{{/each}}';
    var e = Handlebars.compile(c);
    if (typeof f !== "undefined" && f.length > 0) {
        jQuery("#twitter .loading-text").replaceWith('<ul class="tweets">' + e(f.slice(0, numTweets)) + "</ul>");
        if (showTwitterProfile) {
            var b = f[0]["user"];
            var d = '<div class="profile"><h3><a href="http://www.twitter.com/' + twitterUsername + '">@' + twitterUsername + '</a><br/> <span class="name">' + b.name + "</span></h3>";
            d += '<p class="bio">' + b.description + "</p></div>";
            jQuery("#twitter .tweets").before(d)
        }
    } else {
        jQuery.getJSON("http://search.twitter.com/search.json?&q=from:" + twitterUsername + "&rpp=" + numTweets + "&callback=?", function (a) {
            if (a.results.length == 0) {
                jQuery("#twitter .loading-text").text("Error fetching tweets. Your latest tweets may have expired from Twitter's search history.");
                return true
            }
            jQuery("#twitter .loading-text").replaceWith('<ul class="tweets">' + e(a.results) + "</ul>")
        })
    }
}
function linkifyTweet(a) {
    return a.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>').replace(/(^|\s)#(\w+)/g, '$1<a href="http://search.twitter.com/search?q=%23$2">#$2</a>').replace(/(^|\s)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
}
function relative_time(b) {
    var a = parseDate(b);
    var c = (arguments.length > 1) ? arguments[1] : new Date();
    var d = parseInt((c.getTime() - a) / 1000);
    if (d < 60) {
        return "less than a minute ago"
    } else {
        if (d < 120) {
            return "about a minute ago"
        } else {
            if (d < (45 * 60)) {
                return (parseInt(d / 60)).toString() + " minutes ago"
            } else {
                if (d < (90 * 60)) {
                    return "about an hour ago"
                } else {
                    if (d < (24 * 60 * 60)) {
                        return "about " + (parseInt(d / 3600)).toString() + " hours ago"
                    } else {
                        if (d < (48 * 60 * 60)) {
                            return "1 day ago"
                        } else {
                            return (parseInt(d / 86400)).toString() + " days ago"
                        }
                    }
                }
            }
        }
    }
}
function parseDate(b) {
    var a = b.split(" ");
    return new Date(Date.parse(a[1] + " " + a[2] + ", " + a[5] + " " + a[3] + " UTC"))
}
window.log = function () {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        console.log(Array.prototype.slice.call(arguments))
    }
};
