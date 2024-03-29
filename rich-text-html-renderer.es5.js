"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */

/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

var escapeHtml_1 = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = "" + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = "";
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = "&quot;";
        break;
      case 38: // &
        escape = "&amp;";
        break;
      case 39: // '
        escape = "&#39;";
        break;
      case 60: // <
        escape = "&lt;";
        break;
      case 62: // >
        escape = "&gt;";
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}

var commonjsGlobal =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : typeof self !== "undefined"
    ? self
    : {};

function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default")
    ? x["default"]
    : x;
}

function createCommonjsModule(fn, module) {
  return (module = { exports: {} }), fn(module, module.exports), module.exports;
}

var blocks = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.BLOCKS = void 0;
  /**
   * Map of all Contentful block types. Blocks contain inline or block nodes.
   */
  var BLOCKS;
  (function (BLOCKS) {
    BLOCKS["DOCUMENT"] = "document";
    BLOCKS["PARAGRAPH"] = "paragraph";
    BLOCKS["HEADING_1"] = "heading-1";
    BLOCKS["HEADING_2"] = "heading-2";
    BLOCKS["HEADING_3"] = "heading-3";
    BLOCKS["HEADING_4"] = "heading-4";
    BLOCKS["HEADING_5"] = "heading-5";
    BLOCKS["HEADING_6"] = "heading-6";
    BLOCKS["OL_LIST"] = "ordered-list";
    BLOCKS["UL_LIST"] = "unordered-list";
    BLOCKS["LIST_ITEM"] = "list-item";
    BLOCKS["HR"] = "hr";
    BLOCKS["QUOTE"] = "blockquote";
    BLOCKS["EMBEDDED_ENTRY"] = "embedded-entry-block";
    BLOCKS["EMBEDDED_ASSET"] = "embedded-asset-block";
    BLOCKS["TABLE"] = "table";
    BLOCKS["TABLE_ROW"] = "table-row";
    BLOCKS["TABLE_CELL"] = "table-cell";
    BLOCKS["TABLE_HEADER_CELL"] = "table-header-cell";
  })((BLOCKS = exports.BLOCKS || (exports.BLOCKS = {})));
});

unwrapExports(blocks);
var blocks_1 = blocks.BLOCKS;

var inlines = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.INLINES = void 0;
  /**
   * Map of all Contentful inline types. Inline contain inline or text nodes.
   */
  var INLINES;
  (function (INLINES) {
    INLINES["HYPERLINK"] = "hyperlink";
    INLINES["ENTRY_HYPERLINK"] = "entry-hyperlink";
    INLINES["ASSET_HYPERLINK"] = "asset-hyperlink";
    INLINES["EMBEDDED_ENTRY"] = "embedded-entry-inline";
  })((INLINES = exports.INLINES || (exports.INLINES = {})));
});

unwrapExports(inlines);
var inlines_1 = inlines.INLINES;

var marks = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * Map of all Contentful marks.
   */
  var MARKS;
  (function (MARKS) {
    MARKS["BOLD"] = "bold";
    MARKS["ITALIC"] = "italic";
    MARKS["UNDERLINE"] = "underline";
    MARKS["CODE"] = "code";
    MARKS["SUPERSCRIPT"] = "superscript";
    MARKS["SUBSCRIPT"] = "subscript";
  })(MARKS || (MARKS = {}));
  exports.default = MARKS;
});

unwrapExports(marks);

var schemaConstraints = createCommonjsModule(function (module, exports) {
  var __spreadArray =
    (commonjsGlobal && commonjsGlobal.__spreadArray) ||
    function (to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
  var __importDefault =
    (commonjsGlobal && commonjsGlobal.__importDefault) ||
    function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
    };
  var _a;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.V1_MARKS =
    exports.V1_NODE_TYPES =
    exports.TEXT_CONTAINERS =
    exports.HEADINGS =
    exports.CONTAINERS =
    exports.VOID_BLOCKS =
    exports.TABLE_BLOCKS =
    exports.LIST_ITEM_BLOCKS =
    exports.TOP_LEVEL_BLOCKS =
      void 0;

  var marks_1 = __importDefault(marks);
  /**
   * Array of all top level block types.
   * Only these block types can be the direct children of the document.
   */
  exports.TOP_LEVEL_BLOCKS = [
    blocks.BLOCKS.PARAGRAPH,
    blocks.BLOCKS.HEADING_1,
    blocks.BLOCKS.HEADING_2,
    blocks.BLOCKS.HEADING_3,
    blocks.BLOCKS.HEADING_4,
    blocks.BLOCKS.HEADING_5,
    blocks.BLOCKS.HEADING_6,
    blocks.BLOCKS.OL_LIST,
    blocks.BLOCKS.UL_LIST,
    blocks.BLOCKS.HR,
    blocks.BLOCKS.QUOTE,
    blocks.BLOCKS.EMBEDDED_ENTRY,
    blocks.BLOCKS.EMBEDDED_ASSET,
    blocks.BLOCKS.TABLE,
  ];
  /**
   * Array of all allowed block types inside list items
   */
  exports.LIST_ITEM_BLOCKS = [
    blocks.BLOCKS.PARAGRAPH,
    blocks.BLOCKS.HEADING_1,
    blocks.BLOCKS.HEADING_2,
    blocks.BLOCKS.HEADING_3,
    blocks.BLOCKS.HEADING_4,
    blocks.BLOCKS.HEADING_5,
    blocks.BLOCKS.HEADING_6,
    blocks.BLOCKS.OL_LIST,
    blocks.BLOCKS.UL_LIST,
    blocks.BLOCKS.HR,
    blocks.BLOCKS.QUOTE,
    blocks.BLOCKS.EMBEDDED_ENTRY,
    blocks.BLOCKS.EMBEDDED_ASSET,
  ];
  exports.TABLE_BLOCKS = [
    blocks.BLOCKS.TABLE,
    blocks.BLOCKS.TABLE_ROW,
    blocks.BLOCKS.TABLE_CELL,
    blocks.BLOCKS.TABLE_HEADER_CELL,
  ];
  /**
   * Array of all void block types
   */
  exports.VOID_BLOCKS = [
    blocks.BLOCKS.HR,
    blocks.BLOCKS.EMBEDDED_ENTRY,
    blocks.BLOCKS.EMBEDDED_ASSET,
  ];
  /**
   * Dictionary of all container block types, and the set block types they accept as children.
   *
   * Note: This does not include `[BLOCKS.DOCUMENT]: TOP_LEVEL_BLOCKS`
   */
  exports.CONTAINERS =
    ((_a = {}),
    (_a[blocks.BLOCKS.OL_LIST] = [blocks.BLOCKS.LIST_ITEM]),
    (_a[blocks.BLOCKS.UL_LIST] = [blocks.BLOCKS.LIST_ITEM]),
    (_a[blocks.BLOCKS.LIST_ITEM] = exports.LIST_ITEM_BLOCKS),
    (_a[blocks.BLOCKS.QUOTE] = [blocks.BLOCKS.PARAGRAPH]),
    (_a[blocks.BLOCKS.TABLE] = [blocks.BLOCKS.TABLE_ROW]),
    (_a[blocks.BLOCKS.TABLE_ROW] = [
      blocks.BLOCKS.TABLE_CELL,
      blocks.BLOCKS.TABLE_HEADER_CELL,
    ]),
    (_a[blocks.BLOCKS.TABLE_CELL] = [blocks.BLOCKS.PARAGRAPH]),
    (_a[blocks.BLOCKS.TABLE_HEADER_CELL] = [blocks.BLOCKS.PARAGRAPH]),
    _a);
  /**
   * Array of all heading levels
   */
  exports.HEADINGS = [
    blocks.BLOCKS.HEADING_1,
    blocks.BLOCKS.HEADING_2,
    blocks.BLOCKS.HEADING_3,
    blocks.BLOCKS.HEADING_4,
    blocks.BLOCKS.HEADING_5,
    blocks.BLOCKS.HEADING_6,
  ];
  /**
   * Array of all block types that may contain text and inline nodes.
   */
  exports.TEXT_CONTAINERS = __spreadArray(
    [blocks.BLOCKS.PARAGRAPH],
    exports.HEADINGS,
    true
  );
  /**
   * Node types before `tables` release.
   */
  exports.V1_NODE_TYPES = [
    blocks.BLOCKS.DOCUMENT,
    blocks.BLOCKS.PARAGRAPH,
    blocks.BLOCKS.HEADING_1,
    blocks.BLOCKS.HEADING_2,
    blocks.BLOCKS.HEADING_3,
    blocks.BLOCKS.HEADING_4,
    blocks.BLOCKS.HEADING_5,
    blocks.BLOCKS.HEADING_6,
    blocks.BLOCKS.OL_LIST,
    blocks.BLOCKS.UL_LIST,
    blocks.BLOCKS.LIST_ITEM,
    blocks.BLOCKS.HR,
    blocks.BLOCKS.QUOTE,
    blocks.BLOCKS.EMBEDDED_ENTRY,
    blocks.BLOCKS.EMBEDDED_ASSET,
    inlines.INLINES.HYPERLINK,
    inlines.INLINES.ENTRY_HYPERLINK,
    inlines.INLINES.ASSET_HYPERLINK,
    inlines.INLINES.EMBEDDED_ENTRY,
    "text",
  ];
  /**
   * Marks before `superscript` & `subscript` release.
   */
  exports.V1_MARKS = [
    marks_1.default.BOLD,
    marks_1.default.CODE,
    marks_1.default.ITALIC,
    marks_1.default.UNDERLINE,
  ];
});

unwrapExports(schemaConstraints);
var schemaConstraints_1 = schemaConstraints.V1_MARKS;
var schemaConstraints_2 = schemaConstraints.V1_NODE_TYPES;
var schemaConstraints_3 = schemaConstraints.TEXT_CONTAINERS;
var schemaConstraints_4 = schemaConstraints.HEADINGS;
var schemaConstraints_5 = schemaConstraints.CONTAINERS;
var schemaConstraints_6 = schemaConstraints.VOID_BLOCKS;
var schemaConstraints_7 = schemaConstraints.TABLE_BLOCKS;
var schemaConstraints_8 = schemaConstraints.LIST_ITEM_BLOCKS;
var schemaConstraints_9 = schemaConstraints.TOP_LEVEL_BLOCKS;

var types = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(types);

var nodeTypes = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(nodeTypes);

var emptyDocument = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });

  /**
   * A rich text document considered to be empty.
   * Any other document structure than this is not considered empty.
   */
  var EMPTY_DOCUMENT = {
    nodeType: blocks.BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: blocks.BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: "text",
            value: "",
            marks: [],
            data: {},
          },
        ],
      },
    ],
  };
  exports.default = EMPTY_DOCUMENT;
});

unwrapExports(emptyDocument);

var helpers = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.isText = exports.isBlock = exports.isInline = void 0;

  /**
   * Tiny replacement for Object.values(object).includes(key) to
   * avoid including CoreJS polyfills
   */
  function hasValue(obj, value) {
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
      var key = _a[_i];
      if (value === obj[key]) {
        return true;
      }
    }
    return false;
  }
  /**
   * Checks if the node is an instance of Inline.
   */
  function isInline(node) {
    return hasValue(inlines.INLINES, node.nodeType);
  }
  exports.isInline = isInline;
  /**
   * Checks if the node is an instance of Block.
   */
  function isBlock(node) {
    return hasValue(blocks.BLOCKS, node.nodeType);
  }
  exports.isBlock = isBlock;
  /**
   * Checks if the node is an instance of Text.
   */
  function isText(node) {
    return node.nodeType === "text";
  }
  exports.isText = isText;
});

unwrapExports(helpers);
var helpers_1 = helpers.isText;
var helpers_2 = helpers.isBlock;
var helpers_3 = helpers.isInline;

var dist = createCommonjsModule(function (module, exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __setModuleDefault =
    (commonjsGlobal && commonjsGlobal.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, "default", { enumerable: true, value: v });
        }
      : function (o, v) {
          o["default"] = v;
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  var __importStar =
    (commonjsGlobal && commonjsGlobal.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
    };
  var __importDefault =
    (commonjsGlobal && commonjsGlobal.__importDefault) ||
    function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.helpers =
    exports.EMPTY_DOCUMENT =
    exports.MARKS =
    exports.INLINES =
    exports.BLOCKS =
      void 0;

  Object.defineProperty(exports, "BLOCKS", {
    enumerable: true,
    get: function () {
      return blocks.BLOCKS;
    },
  });

  Object.defineProperty(exports, "INLINES", {
    enumerable: true,
    get: function () {
      return inlines.INLINES;
    },
  });

  Object.defineProperty(exports, "MARKS", {
    enumerable: true,
    get: function () {
      return __importDefault(marks).default;
    },
  });
  __exportStar(schemaConstraints, exports);
  __exportStar(types, exports);
  __exportStar(nodeTypes, exports);

  Object.defineProperty(exports, "EMPTY_DOCUMENT", {
    enumerable: true,
    get: function () {
      return __importDefault(emptyDocument).default;
    },
  });
  var helpers$1 = __importStar(helpers);
  exports.helpers = helpers$1;
});

unwrapExports(dist);
var dist_1 = dist.helpers;
var dist_2 = dist.EMPTY_DOCUMENT;
var dist_3 = dist.MARKS;
var dist_4 = dist.INLINES;
var dist_5 = dist.BLOCKS;

var _a, _b;
var attributeValue = function (value) {
  return '"'.concat(value.replace(/"/g, "&quot;"), '"');
};
var defaultNodeRenderers =
  ((_a = {}),
  (_a[dist_5.PARAGRAPH] = function (node, next) {
    return "<p>".concat(next(node.content), "</p>");
  }),
  (_a[dist_5.HEADING_1] = function (node, next) {
    return "<h1>".concat(next(node.content), "</h1>");
  }),
  (_a[dist_5.HEADING_2] = function (node, next) {
    return "<h2>".concat(next(node.content), "</h2>");
  }),
  (_a[dist_5.HEADING_3] = function (node, next) {
    return "<h3>".concat(next(node.content), "</h3>");
  }),
  (_a[dist_5.HEADING_4] = function (node, next) {
    return "<h4>".concat(next(node.content), "</h4>");
  }),
  (_a[dist_5.HEADING_5] = function (node, next) {
    return "<h5>".concat(next(node.content), "</h5>");
  }),
  (_a[dist_5.HEADING_6] = function (node, next) {
    return "<h6>".concat(next(node.content), "</h6>");
  }),
  (_a[dist_5.EMBEDDED_ENTRY] = function (node, next) {
    return "<div>".concat(next(node.content), "</div>");
  }),
  (_a[dist_5.UL_LIST] = function (node, next) {
    return "<ul>".concat(next(node.content), "</ul>");
  }),
  (_a[dist_5.OL_LIST] = function (node, next) {
    return "<ol>".concat(next(node.content), "</ol>");
  }),
  (_a[dist_5.LIST_ITEM] = function (node, next) {
    return "<li>".concat(next(node.content), "</li>");
  }),
  (_a[dist_5.QUOTE] = function (node, next) {
    return "<blockquote>".concat(next(node.content), "</blockquote>");
  }),
  (_a[dist_5.HR] = function () {
    return "<hr/>";
  }),
  (_a[dist_5.TABLE] = function (node, next) {
    return "<table>".concat(next(node.content), "</table>");
  }),
  (_a[dist_5.TABLE_ROW] = function (node, next) {
    return "<tr>".concat(next(node.content), "</tr>");
  }),
  (_a[dist_5.TABLE_HEADER_CELL] = function (node, next) {
    return "<th>".concat(next(node.content), "</th>");
  }),
  (_a[dist_5.TABLE_CELL] = function (node, next) {
    return "<td>".concat(next(node.content), "</td>");
  }),
  (_a[dist_4.ASSET_HYPERLINK] = function (node) {
    return defaultInline(dist_4.ASSET_HYPERLINK, node);
  }),
  (_a[dist_4.ENTRY_HYPERLINK] = function (node) {
    return defaultInline(dist_4.ENTRY_HYPERLINK, node);
  }),
  (_a[dist_4.EMBEDDED_ENTRY] = function (node) {
    return defaultInline(dist_4.EMBEDDED_ENTRY, node);
  }),
  (_a[dist_4.HYPERLINK] = function (node, next) {
    var href = typeof node.data.uri === "string" ? node.data.uri : "";
    return "<a href="
      .concat(attributeValue(href), ">")
      .concat(next(node.content), "</a>");
  }),
  _a);
var defaultMarkRenderers =
  ((_b = {}),
  (_b[dist_3.BOLD] = function (text) {
    return "<b>".concat(text, "</b>");
  }),
  (_b[dist_3.ITALIC] = function (text) {
    return "<i>".concat(text, "</i>");
  }),
  (_b[dist_3.UNDERLINE] = function (text) {
    return "<u>".concat(text, "</u>");
  }),
  (_b[dist_3.CODE] = function (text) {
    return "<code>".concat(text, "</code>");
  }),
  (_b[dist_3.SUPERSCRIPT] = function (text) {
    return "<sup>".concat(text, "</sup>");
  }),
  (_b[dist_3.SUBSCRIPT] = function (text) {
    return "<sub>".concat(text, "</sub>");
  }),
  _b);
var defaultInline = function (type, node) {
  return "<span>type: "
    .concat(escapeHtml_1(type), " id: ")
    .concat(escapeHtml_1(node.data.target.sys.id), "</span>");
};
/**
 * Serialize a Contentful Rich Text `document` to an html string.
 */
function documentToHtmlString(richTextDocument, options) {
  if (options === void 0) {
    options = {};
  }
  if (!richTextDocument || !richTextDocument.content) {
    return "";
  }
  return nodeListToHtmlString(richTextDocument.content, {
    renderNode: __assign(
      __assign({}, defaultNodeRenderers),
      options.renderNode
    ),
    renderMark: __assign(
      __assign({}, defaultMarkRenderers),
      options.renderMark
    ),
  });
}
function nodeListToHtmlString(nodes, _a) {
  var renderNode = _a.renderNode,
    renderMark = _a.renderMark;
  return nodes
    .map(function (node) {
      return nodeToHtmlString(node, {
        renderNode: renderNode,
        renderMark: renderMark,
      });
    })
    .join("");
}
function nodeToHtmlString(node, _a) {
  var renderNode = _a.renderNode,
    renderMark = _a.renderMark;
  if (dist_1.isText(node)) {
    var nodeValue = escapeHtml_1(node.value);
    if (node.marks.length > 0) {
      return node.marks.reduce(function (value, mark) {
        if (!renderMark[mark.type]) {
          return value;
        }
        return renderMark[mark.type](value);
      }, nodeValue);
    }
    return nodeValue;
  } else {
    var nextNode = function (nodes) {
      return nodeListToHtmlString(nodes, {
        renderMark: renderMark,
        renderNode: renderNode,
      });
    };
    if (!node.nodeType || !renderNode[node.nodeType]) {
      // TODO: Figure what to return when passed an unrecognized node.
      return "";
    }
    return renderNode[node.nodeType](node, nextNode);
  }
}

exports.documentToHtmlString = documentToHtmlString;
//# sourceMappingURL=rich-text-html-renderer.es5.js.map
