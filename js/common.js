$(document).ready(function () {
    var filter = loadFilter();

    renderCategoryList(filter);
    renderCatalog(loadCatalog(filter));

    $("input[name='catalogFilter']").on('change', function () {
        setFilerValue($(this).data('id'), this.checked);
        renderCatalog(loadCatalog(filter));
    });

    function bindCatalogEvents() {
        var modal = $('#buyModal');
        var buyBtn = $('.buy-btn');

        buyBtn.on('click', function (event) {
            event.preventDefault();
            renderBuyPopup(getProduct($(this).data('id')));
            modal.show();


        });

    }

    function bindPopupEvents() {
        var modal = $('#buyModal');
        var modalContent = $('#buyModal .modal-content');
        var modalCloseBtn = $('#buyModal .modal-content .close');
        var buyBtn = $('.buy-btn');

        $(window).on('click', function (e) {
            if (!modalContent.is(e.target)
                && modalContent.has(e.target).length === 0
                && !buyBtn.is(e.target)) {
                modal.hide();
            }
        });

        modalCloseBtn.on('click', function () {
            modal.hide();
        });
    }

    /**
     *
     * @param id
     * @returns {BigInt | number | * | void}
     */
    function getProduct(id) {
        return _.find(loadCatalog(filter), function (catalogItem) {
            return catalogItem.id === id;
        })
    }
    /**
     *
     * @param key
     * @param value
     */
    function setFilerValue(key, value) {
        _.find(filter, function (filterItem) {
            return filterItem.id === key
        }).active = value;
    }

    /**
     *
     * @param product
     */
    function renderBuyPopup(product) {
        var template = $("#buyPopup").html();
        $(".modal-content").html(_.template(template)({product: product}));
        bindPopupEvents();
    }

    /**
     *
     * @param filter
     */
    function renderCategoryList(filter) {
        var template = $("#filterList").html();
        $(".filter").html(_.template(template)({filter: filter}));
    }

    /**
     *
     * @param catalog
     */
    function renderCatalog(catalog) {
        // console.log(catalog);
        var template = $("#catalogList").html();
        $(".gallery").html(_.template(template)({catalog: catalog}));
        bindCatalogEvents();
    }

    /**
     *
     * @param filter
     * @returns {*}
     */
    function loadCatalog(filter) {
        return filterCatalog(getAllProducts(), getActiveFilterIds(filter));
    }

    /**
     *
     * @param filter
     * @returns {Uint8Array | BigInt64Array | any[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array | *}
     */
    function getActiveFilterIds(filter) {
        return _.map(_.filter(filter, function (item) {
            return item.active === true;
        }), function (item) {
            return item.id;
        });
    }

    /**
     *
     * @param catalog
     * @param filterIds
     * @returns {*}
     */
    function filterCatalog(catalog, filterIds) {
        return _.filter(catalog, function (catalogItem) {
            return _.intersection(catalogItem.category_ids, filterIds).length;
        });
    }


    /**
     *
     * @returns {*[]}
     */
    function loadFilter() {
        return [
            {id: 1, name: "Смартфоны", active: true},
            {id: 2, name: "Планшеты/Ноутбуки", active: true},
            {id: 3, name: "Часы", active: true},
            {id: 4, name: "Аксессуары", active: true},
            {id: 5, name: "Другое", active: true}
        ];
    }

    /**
     *
     * @returns {*[]}
     */
    function getAllProducts() {
        return [
            {
                id: 1,
                name: "iPhone 5s",
                price: 519.50,
                image: "img/phone.jpg",
                category_ids: [1, 5],
                params: {
                    memory: [64, 32, 256],
                    color: ["Белый", "Синий"],
                    max_count: 18
                }
            },
            {
                id: 2,
                name: "iPhone 6",
                price: 600.00,
                image: "img/phone.jpg",
                category_ids: [1],
                params: {
                    memory: [64, 32],
                    color: ["Белый", "Синий"],
                    max_count: 4
                }
            },
            {
                id: 3,
                name: "iPad mini",
                price: 999.00,
                image: "img/phone.jpg",
                category_ids: [2],
                params: {
                    memory: [64, 32],
                    color: ["Белый", "Синий"],
                    max_count: 18
                }
            },
            {
                id: 4,
                name: "Apple watch",
                price: 781.00,
                image: "img/phone.jpg",
                category_ids: [3, 4],
                params: {
                    memory: [64, 32],
                    color: ["Белый", "Синий"],
                    max_count: 18
                }
            },
            {
                id: 5,
                name: "iPhone 8+",
                price: 900.00,
                image: "img/phone.jpg",
                category_ids: [1],
                params: {
                    memory: [64, 32],
                    color: ["Белый", "Синий"],
                    max_count: 18
                }
            },
            {
                id: 6,
                name: "iPhone 9",
                price: 741.00,
                image: "img/phone.jpg",
                category_ids: [1, 5],
                params: {
                    memory: [64, 32],
                    color: ["Белый", "Синий"],
                    max_count: 18
                }
            }
        ];
    }
});