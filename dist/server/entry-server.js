import { jsxs, jsx, Fragment } from '@emotion/react/jsx-runtime';
import React3, { useEffect, createContext, useState, useMemo, useContext, useRef, Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import _styled from '@emotion/styled/base';
import { faCopy, faMoon, faSun, faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink, useParams, useLocation, Outlet, Routes as Routes$1, Route } from 'react-router-dom';
import dayjs from 'dayjs';
import { css, Global, keyframes, createElement } from '@emotion/react';
import Markdown from 'react-markdown';
import matter from 'gray-matter';
import 'dayjs/locale/en.js';
import { Prism } from 'react-syntax-highlighter';
import { animated, useTransition } from 'react-spring';
import { createPortal } from 'react-dom';
import { styled, Button as Button$2 } from '@mui/material';
import fastCompare from 'react-fast-compare';
import invariant from 'invariant';
import shallowEqual from 'shallowequal';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import fs from 'fs';
import { StaticRouter } from 'react-router-dom/server.mjs';

const cssVar = (str) => `var(--colors-${str})`;
const theme = {
  colors: {
    text: cssVar("text"),
    primary: cssVar("primary"),
    background: cssVar("background"),
    background2: cssVar("background2"),
    anchor: cssVar("anchor"),
    secondaryText: cssVar("secondary-text"),
    aboutLinkIcon: cssVar("about-link-icon"),
    aboutLinkIconHover: cssVar("about-link-icon-hover"),
    tipBackground: cssVar("tip-background"),
    tabText: cssVar("tab-text"),
    tabSelected: cssVar("tab-selected"),
    tabSelectedBackground: cssVar("tab-selected-background"),
    postCardBorder: cssVar("post-card-border"),
    blockquoteBackground: cssVar("blockquote-background"),
    contentText: cssVar("content-text"),
    blockquoteBorder: cssVar("blockquote-border"),
    paste: cssVar("paste"),
    pasteHover: cssVar("paste-hover")
  }
};

const Tip = /* @__PURE__ */ _styled("div", process.env.NODE_ENV === "production" ? {
  target: "ejfwysq0"
} : {
  target: "ejfwysq0",
  label: "Tip"
})({
  position: "absolute",
  bottom: "-37px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "6px",
  borderRadius: "4px",
  backgroundColor: theme.colors.tipBackground,
  fontSize: ".6rem",
  fontWeight: 600,
  color: "white",
  transition: "opacity 0.3s ease-in-out",
  visibility: "hidden",
  opacity: 0,
  zIndex: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-5px",
    left: "50%",
    width: "6px",
    height: "6px",
    backgroundColor: theme.colors.tipBackground,
    transform: "rotate(45deg) translateY(50%)"
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvc3R5bGVzL2NvbXBvbmVudHMvVGlwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHWSIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL3N0eWxlcy9jb21wb25lbnRzL1RpcC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0aGVtZSB9IGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi90aGVtZSc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcclxuXHJcbmNvbnN0IFRpcCA9IHN0eWxlZC5kaXYoe1xyXG5cdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdGJvdHRvbTogJy0zN3B4JyxcclxuXHRsZWZ0OiAnNTAlJyxcclxuXHR0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxuXHRwYWRkaW5nOiAnNnB4JyxcclxuXHRib3JkZXJSYWRpdXM6ICc0cHgnLFxyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnRpcEJhY2tncm91bmQsXHJcblx0Zm9udFNpemU6ICcuNnJlbScsXHJcblx0Zm9udFdlaWdodDogNjAwLFxyXG5cdGNvbG9yOiAnd2hpdGUnLFxyXG5cdHRyYW5zaXRpb246ICdvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXQnLFxyXG5cdHZpc2liaWxpdHk6ICdoaWRkZW4nLFxyXG5cdG9wYWNpdHk6IDAsXHJcblx0ekluZGV4OiAxLFxyXG5cclxuXHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0Y29udGVudDogJ1wiXCInLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHR0b3A6ICctNXB4JyxcclxuXHRcdGxlZnQ6ICc1MCUnLFxyXG5cdFx0d2lkdGg6ICc2cHgnLFxyXG5cdFx0aGVpZ2h0OiAnNnB4JyxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnRpcEJhY2tncm91bmQsXHJcblx0XHR0cmFuc2Zvcm06ICdyb3RhdGUoNDVkZWcpIHRyYW5zbGF0ZVkoNTAlKScsXHJcblx0fSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaXA7XHJcbiJdfQ== */");

function _EMOTION_STRINGIFIED_CSS_ERROR__$b() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const blind = process.env.NODE_ENV === "production" ? {
  name: "4gx3ze",
  styles: "position:absolute;clip:rect(0 0 0 0);width:1px;height:1px;margin:-1px;overflow:hidden"
} : {
  name: "ad8rpl-blind",
  styles: "position:absolute;clip:rect(0 0 0 0);width:1px;height:1px;margin:-1px;overflow:hidden;label:blind;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvc3R5bGVzL2JsaW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUV3QiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL3N0eWxlcy9ibGluZC50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBibGluZCA9IGNzc2BcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0Y2xpcDogcmVjdCgwIDAgMCAwKTtcclxuXHR3aWR0aDogMXB4O1xyXG5cdGhlaWdodDogMXB4O1xyXG5cdG1hcmdpbjogLTFweDtcclxuXHRvdmVyZmxvdzogaGlkZGVuO1xyXG5gO1xyXG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$b
};

const Button$1 = ({
  content,
  onClick
}) => {
  const handleClick = () => {
    onClick();
  };
  return /* @__PURE__ */ jsxs(CustonButton, { onClick: handleClick, children: [
    /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faCopy, height: 30 }),
    /* @__PURE__ */ jsx(Tip, { children: content })
  ] });
};
const CustonButton = /* @__PURE__ */ _styled("button", process.env.NODE_ENV === "production" ? {
  target: "e3dvev50"
} : {
  target: "e3dvev50",
  label: "CustonButton"
})({
  position: "absolute",
  zIndex: 1,
  right: 0,
  width: "30px",
  height: "30px",
  backgroundColor: "transparent",
  border: "none",
  color: theme.colors.paste,
  transition: "color 0.5s",
  cursor: "pointer",
  "&:hover": {
    color: "white",
    "& div": {
      visibility: "visible",
      opacity: 1
    }
  }
}, {
  blind
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0J1dHRvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJxQiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL2NvbW1vbi9CdXR0b24udHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBJY29uTG9va3VwLCBmYUNvcHkgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xyXG5pbXBvcnQgeyBGb250QXdlc29tZUljb24gfSBmcm9tICdAZm9ydGF3ZXNvbWUvcmVhY3QtZm9udGF3ZXNvbWUnO1xyXG5pbXBvcnQgVGlwIGZyb20gJ0Bjb21wb25lbnRzL3N0eWxlcy9jb21wb25lbnRzL1RpcCc7XHJcbmltcG9ydCB7IGJsaW5kIH0gZnJvbSAnQGNvbXBvbmVudHMvc3R5bGVzL2JsaW5kJztcclxuXHJcbnR5cGUgQnV0dG9uUHJvcHMgPSB7XHJcblx0Y29udGVudDogc3RyaW5nO1xyXG5cdG9uQ2xpY2s6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQnV0dG9uID0gKHsgY29udGVudCwgb25DbGljayB9OiBCdXR0b25Qcm9wcykgPT4ge1xyXG5cdGNvbnN0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xyXG5cdFx0b25DbGljaygpO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8Q3VzdG9uQnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfT5cclxuXHRcdFx0PEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYUNvcHkgYXMgSWNvbkxvb2t1cH0gaGVpZ2h0PXszMH0gLz5cclxuXHRcdFx0PFRpcD57Y29udGVudH08L1RpcD5cclxuXHRcdDwvQ3VzdG9uQnV0dG9uPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBDdXN0b25CdXR0b24gPSBzdHlsZWQuYnV0dG9uKFxyXG5cdHtcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0ekluZGV4OiAxLFxyXG5cdFx0cmlnaHQ6IDAsXHJcblx0XHR3aWR0aDogJzMwcHgnLFxyXG5cdFx0aGVpZ2h0OiAnMzBweCcsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXHJcblx0XHRib3JkZXI6ICdub25lJyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvcnMucGFzdGUsXHJcblx0XHR0cmFuc2l0aW9uOiAnY29sb3IgMC41cycsXHJcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcclxuXHJcblx0XHQnJjpob3Zlcic6IHtcclxuXHRcdFx0Y29sb3I6ICd3aGl0ZScsXHJcblxyXG5cdFx0XHQnJiBkaXYnOiB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogJ3Zpc2libGUnLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDEsXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0eyBibGluZCB9LFxyXG4pO1xyXG4iXX0= */");

const Categories = ({
  categories,
  withLink = false
}) => {
  return /* @__PURE__ */ jsx(Wrapper$b, { children: categories.map((category) => {
    return /* @__PURE__ */ jsx("li", { children: withLink ? /* @__PURE__ */ jsx(Link, { to: `/posts/${category}`, children: category.toLocaleUpperCase() }) : category.toLocaleUpperCase() }, category);
  }) });
};
const Wrapper$b = /* @__PURE__ */ _styled("ul", process.env.NODE_ENV === "production" ? {
  target: "enopndn0"
} : {
  target: "enopndn0",
  label: "Wrapper"
})({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  color: theme.colors.text,
  fontSize: ".8rem",
  fontWeight: 600,
  boxSizing: "content-box",
  zIndex: 1,
  "& li:hover": {
    position: "relative",
    "& a::before": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `2px solid ${theme.colors.text}`
    }
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0NhdGVnb3JpZXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdDZ0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vQ2F0ZWdvcmllcy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnLi90aGVtZSc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuXHJcbnR5cGUgQ2F0ZWdvcmllc1Byb3BzID0ge1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHdpdGhMaW5rPzogYm9vbGVhbjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDYXRlZ29yaWVzID0gKHtcclxuXHRjYXRlZ29yaWVzLFxyXG5cdHdpdGhMaW5rID0gZmFsc2UsXHJcbn06IENhdGVnb3JpZXNQcm9wcykgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0e2NhdGVnb3JpZXMubWFwKChjYXRlZ29yeSkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8bGkga2V5PXtjYXRlZ29yeX0+XHJcblx0XHRcdFx0XHRcdHt3aXRoTGluayA/IChcclxuXHRcdFx0XHRcdFx0XHQ8TGluayB0bz17YC9wb3N0cy8ke2NhdGVnb3J5fWB9PlxyXG5cdFx0XHRcdFx0XHRcdFx0e2NhdGVnb3J5LnRvTG9jYWxlVXBwZXJDYXNlKCl9XHJcblx0XHRcdFx0XHRcdFx0PC9MaW5rPlxyXG5cdFx0XHRcdFx0XHQpIDogKFxyXG5cdFx0XHRcdFx0XHRcdGNhdGVnb3J5LnRvTG9jYWxlVXBwZXJDYXNlKClcclxuXHRcdFx0XHRcdFx0KX1cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSl9XHJcblx0XHQ8L1dyYXBwZXI+XHJcblx0KTtcclxufTtcclxuXHJcbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQudWwoe1xyXG5cdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0Z2FwOiAnNHB4JyxcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0Zm9udFNpemU6ICcuOHJlbScsXHJcblx0Zm9udFdlaWdodDogNjAwLFxyXG5cdGJveFNpemluZzogJ2NvbnRlbnQtYm94JyxcclxuXHR6SW5kZXg6IDEsXHJcblxyXG5cdCcmIGxpOmhvdmVyJzoge1xyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblxyXG5cdFx0JyYgYTo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHRsZWZ0OiAwLFxyXG5cdFx0XHRyaWdodDogMCxcclxuXHRcdFx0Ym90dG9tOiAwLFxyXG5cdFx0XHRib3JkZXJCb3R0b206IGAycHggc29saWQgJHt0aGVtZS5jb2xvcnMudGV4dH1gLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxuIl19 */");

const Date$1 = ({
  date,
  format = "MMMM DD, YYYY"
}) => {
  return /* @__PURE__ */ jsx("span", { children: dayjs(date).locale("en").format(format) });
};

const Footer = () => {
  return /* @__PURE__ */ jsxs(Wrapper$a, { children: [
    "© 2023 ",
    /* @__PURE__ */ jsx(Anchor, { href: "https://github.com/uiseop", target: "_blank", rel: "noreferrer", children: "섭이" }),
    " powered by ",
    /* @__PURE__ */ jsx(Anchor, { href: "https://github.com/uiseop", target: "_blank", rel: "noreferrer", children: "uiseop.github.io" })
  ] });
};
const Wrapper$a = /* @__PURE__ */ _styled("footer", process.env.NODE_ENV === "production" ? {
  target: "ev4k88w1"
} : {
  target: "ev4k88w1",
  label: "Wrapper"
})({
  display: "flex",
  marginTop: "auto",
  height: "63px",
  justifyContent: "center",
  alignItems: "center",
  color: theme.colors.text,
  backgroundColor: theme.colors.background
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0Zvb3Rlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JnQiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL2NvbW1vbi9Gb290ZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyB0aGVtZSB9IGZyb20gJy4vdGhlbWUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEZvb3RlciA9ICgpID0+IHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PFdyYXBwZXI+XHJcblx0XHRcdMKpIDIwMjMmbmJzcDtcclxuXHRcdFx0PEFuY2hvciBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3Vpc2VvcFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5cclxuXHRcdFx0XHTshK3snbRcclxuXHRcdFx0PC9BbmNob3I+XHJcblx0XHRcdCZuYnNwO3Bvd2VyZWQgYnkmbmJzcDtcclxuXHRcdFx0PEFuY2hvciBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3Vpc2VvcFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5cclxuXHRcdFx0XHR1aXNlb3AuZ2l0aHViLmlvXHJcblx0XHRcdDwvQW5jaG9yPlxyXG5cdFx0PC9XcmFwcGVyPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmZvb3Rlcih7XHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdG1hcmdpblRvcDogJ2F1dG8nLFxyXG5cdGhlaWdodDogJzYzcHgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZCxcclxufSk7XHJcblxyXG5jb25zdCBBbmNob3IgPSBzdHlsZWQuYSh7XHJcblx0Y29sb3I6IHRoZW1lLmNvbG9ycy5hbmNob3IsXHJcbn0pO1xyXG4iXX0= */");
const Anchor = /* @__PURE__ */ _styled("a", process.env.NODE_ENV === "production" ? {
  target: "ev4k88w0"
} : {
  target: "ev4k88w0",
  label: "Anchor"
})({
  color: theme.colors.anchor
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0Zvb3Rlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEJlIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0Zvb3Rlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnLi90aGVtZSc7XHJcblxyXG5leHBvcnQgY29uc3QgRm9vdGVyID0gKCkgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0wqkgMjAyMyZuYnNwO1xyXG5cdFx0XHQ8QW5jaG9yIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vdWlzZW9wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxyXG5cdFx0XHRcdOyEreydtFxyXG5cdFx0XHQ8L0FuY2hvcj5cclxuXHRcdFx0Jm5ic3A7cG93ZXJlZCBieSZuYnNwO1xyXG5cdFx0XHQ8QW5jaG9yIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vdWlzZW9wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxyXG5cdFx0XHRcdHVpc2VvcC5naXRodWIuaW9cclxuXHRcdFx0PC9BbmNob3I+XHJcblx0XHQ8L1dyYXBwZXI+XHJcblx0KTtcclxufTtcclxuXHJcbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZm9vdGVyKHtcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0bWFyZ2luVG9wOiAnYXV0bycsXHJcblx0aGVpZ2h0OiAnNjNweCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMudGV4dCxcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9ycy5iYWNrZ3JvdW5kLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvciA9IHN0eWxlZC5hKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmFuY2hvcixcclxufSk7XHJcbiJdfQ== */");

function _EMOTION_STRINGIFIED_CSS_ERROR__$a() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const GlobalStyle = () => {
  return /* @__PURE__ */ jsx(Global, { styles: defaultStyle });
};
const prism = process.env.NODE_ENV === "production" ? {
  name: "1skg5d6",
  styles: "code,code[class*='language-'],pre[class*='language-']{color:#24292e;}pre{color:#24292e;background:#f6f8fa;}.token.function{color:#005cc5;}.token.comment,.token.prolog,.token.doctype,.token.cdata{color:#969896;}.token.punctuation{color:#24292e;}.token.string{color:#032f62;}.token.atrule,.token.attr-value{color:#183691;}.token.property,.token.tag{color:#63a35c;}.token.boolean,.token.number{color:#0086b3;}.token.selector,.token.attr-name,.token.attr-value .punctuation:first-of-type,.token.keyword,.token.regex,.token.important{color:#d73a49;}.token.operator,.token.entity,.token.url,.language-css{color:#d73a49;}.token.entity{cursor:help;}.namespace{opacity:0.7;}"
} : {
  name: "u5scce-prism",
  styles: "code,code[class*='language-'],pre[class*='language-']{color:#24292e;}pre{color:#24292e;background:#f6f8fa;}.token.function{color:#005cc5;}.token.comment,.token.prolog,.token.doctype,.token.cdata{color:#969896;}.token.punctuation{color:#24292e;}.token.string{color:#032f62;}.token.atrule,.token.attr-value{color:#183691;}.token.property,.token.tag{color:#63a35c;}.token.boolean,.token.number{color:#0086b3;}.token.selector,.token.attr-name,.token.attr-value .punctuation:first-of-type,.token.keyword,.token.regex,.token.important{color:#d73a49;}.token.operator,.token.entity,.token.url,.language-css{color:#d73a49;}.token.entity{cursor:help;}.namespace{opacity:0.7;};label:prism;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPaUIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vR2xvYmFsU3R5bGUudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2xvYmFsLCBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XHJcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEdsb2JhbFN0eWxlOiBGdW5jdGlvbkNvbXBvbmVudCA9ICgpID0+IHtcclxuXHRyZXR1cm4gPEdsb2JhbCBzdHlsZXM9e2RlZmF1bHRTdHlsZX0gLz47XHJcbn07XHJcblxyXG5jb25zdCBwcmlzbSA9IGNzc2BcclxuXHRjb2RlLFxyXG5cdGNvZGVbY2xhc3MqPSdsYW5ndWFnZS0nXSxcclxuXHRwcmVbY2xhc3MqPSdsYW5ndWFnZS0nXSB7XHJcblx0XHRjb2xvcjogIzI0MjkyZTtcclxuXHR9XHJcblx0cHJlIHtcclxuXHRcdGNvbG9yOiAjMjQyOTJlO1xyXG5cdFx0YmFja2dyb3VuZDogI2Y2ZjhmYTtcclxuXHR9XHJcblx0LnRva2VuLmZ1bmN0aW9uIHtcclxuXHRcdGNvbG9yOiAjMDA1Y2M1O1xyXG5cdH1cclxuXHQudG9rZW4uY29tbWVudCxcclxuXHQudG9rZW4ucHJvbG9nLFxyXG5cdC50b2tlbi5kb2N0eXBlLFxyXG5cdC50b2tlbi5jZGF0YSB7XHJcblx0XHRjb2xvcjogIzk2OTg5NjtcclxuXHR9XHJcblx0LnRva2VuLnB1bmN0dWF0aW9uIHtcclxuXHRcdGNvbG9yOiAjMjQyOTJlO1xyXG5cdH1cclxuXHQudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiAjMDMyZjYyO1xyXG5cdH1cclxuXHQudG9rZW4uYXRydWxlLFxyXG5cdC50b2tlbi5hdHRyLXZhbHVlIHtcclxuXHRcdGNvbG9yOiAjMTgzNjkxO1xyXG5cdH1cclxuXHQudG9rZW4ucHJvcGVydHksXHJcblx0LnRva2VuLnRhZyB7XHJcblx0XHRjb2xvcjogIzYzYTM1YztcclxuXHR9XHJcblx0LnRva2VuLmJvb2xlYW4sXHJcblx0LnRva2VuLm51bWJlciB7XHJcblx0XHRjb2xvcjogIzAwODZiMztcclxuXHR9XHJcblx0LnRva2VuLnNlbGVjdG9yLFxyXG5cdC50b2tlbi5hdHRyLW5hbWUsXHJcblx0LnRva2VuLmF0dHItdmFsdWUgLnB1bmN0dWF0aW9uOmZpcnN0LW9mLXR5cGUsXHJcblx0LnRva2VuLmtleXdvcmQsXHJcblx0LnRva2VuLnJlZ2V4LFxyXG5cdC50b2tlbi5pbXBvcnRhbnQge1xyXG5cdFx0Y29sb3I6ICNkNzNhNDk7XHJcblx0fVxyXG5cdC50b2tlbi5vcGVyYXRvcixcclxuXHQudG9rZW4uZW50aXR5LFxyXG5cdC50b2tlbi51cmwsXHJcblx0Lmxhbmd1YWdlLWNzcyB7XHJcblx0XHRjb2xvcjogI2Q3M2E0OTtcclxuXHR9XHJcblx0LnRva2VuLmVudGl0eSB7XHJcblx0XHRjdXJzb3I6IGhlbHA7XHJcblx0fVxyXG5cdC5uYW1lc3BhY2Uge1xyXG5cdFx0b3BhY2l0eTogMC43O1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGRhcmsgPSBjc3NgXHJcblx0Y29kZVtjbGFzcyo9J2xhbmd1YWdlLSddLFxyXG5cdHByZVtjbGFzcyo9J2xhbmd1YWdlLSddIHtcclxuXHRcdGNvbG9yOiAjY2NjO1xyXG5cdFx0YmFja2dyb3VuZDogcmdiKDQwLCA0MSwgNTQpO1xyXG5cdH1cclxuXHJcblx0cHJlIHtcclxuXHRcdHRleHQtc2hhZG93OiBub25lO1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzVhNWY4MDtcclxuXHR9XHJcblxyXG5cdC8qIElubGluZSBjb2RlICovXHJcblxyXG5cdDpub3QocHJlKSA+IGNvZGVbY2xhc3MqPSdsYW5ndWFnZS0nXSB7XHJcblx0XHRib3JkZXItcmFkaXVzOiAwLjNlbTtcclxuXHRcdHdoaXRlLXNwYWNlOiBub3JtYWw7XHJcblx0fVxyXG5cclxuXHRwcmUge1xyXG5cdFx0Y29sb3I6ICNjY2M7XHJcblx0XHRiYWNrZ3JvdW5kOiByZ2IoNDAsIDQxLCA1NCk7XHJcblx0fVxyXG5cclxuXHQubGltaXQtMzAwIHtcclxuXHRcdGhlaWdodDogMzAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC00MDAge1xyXG5cdFx0aGVpZ2h0OiA0MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTUwMCB7XHJcblx0XHRoZWlnaHQ6IDUwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNjAwIHtcclxuXHRcdGhlaWdodDogNjAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC03MDAge1xyXG5cdFx0aGVpZ2h0OiA3MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTgwMCB7XHJcblx0XHRoZWlnaHQ6IDgwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uY29tbWVudCB7XHJcblx0XHRjb2xvcjogcmdiYSg5OCwgMTE0LCAxNjQsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnByb2xvZyB7XHJcblx0XHRjb2xvcjogcmdiYSgyMDcsIDIwNywgMTk0LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi50YWcge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjIwLCAxMDQsIDE3MCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uZW50aXR5IHtcclxuXHRcdGNvbG9yOiByZ2JhKDEzOSwgMjMzLCAyNTMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmF0cnVsZSB7XHJcblx0XHRjb2xvcjogcmdiYSg5OCwgMjM5LCAxMTcsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnVybCB7XHJcblx0XHRjb2xvcjogcmdiYSgxMDIsIDIxNywgMjM5LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5zZWxlY3RvciB7XHJcblx0XHRjb2xvcjogcmdiYSgyMDcsIDIwNywgMTk0LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5zdHJpbmcge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjQxLCAyNTAsIDE0MCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ucHJvcGVydHkge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uaW1wb3J0YW50IHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTIxLCAxOTgsIDEpO1xyXG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ucHVuY3R1YXRpb24ge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjMwLCAyMTksIDExNiwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ubnVtYmVyIHtcclxuXHRcdGNvbG9yOiByZ2JhKDE4OSwgMTQ3LCAyNDksIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmZ1bmN0aW9uIHtcclxuXHRcdGNvbG9yOiByZ2JhKDgwLCAyNTAsIDEyMywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uY2xhc3MtbmFtZSB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5rZXl3b3JkIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTIxLCAxOTgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmJvb2xlYW4ge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ub3BlcmF0b3Ige1xyXG5cdFx0Y29sb3I6IHJnYmEoMTM5LCAyMzMsIDI1MywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uY2hhciB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEzNSwgMTU3LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5yZWdleCB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnZhcmlhYmxlIHtcclxuXHRcdGNvbG9yOiByZ2JhKDgwLCAyNTAsIDEyMywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uY29uc3RhbnQge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uc3ltYm9sIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmJ1aWx0aW4ge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxMjEsIDE5OCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYXR0ci12YWx1ZSB7XHJcblx0XHRjb2xvcjogIzdlYzY5OTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5kZWxldGVkIHtcclxuXHRcdGNvbG9yOiAjZTI3NzdhO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLm5hbWVzcGFjZSB7XHJcblx0XHRjb2xvcjogI2UyNzc3YTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5ib2xkIHtcclxuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLml0YWxpYyB7XHJcblx0XHRmb250LXN0eWxlOiBpdGFsaWM7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ge1xyXG5cdFx0Y29sb3I6ICNmZjc5YzY7XHJcblx0fVxyXG5cclxuXHQubGFuZ2FndWUtY3BwIC50b2tlbi5zdHJpbmcge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ2FndWUtYyAudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLWNzcyAudG9rZW4uc2VsZWN0b3Ige1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1jc3MgLnRva2VuLnByb3BlcnR5IHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLWphdmEgc3Bhbi50b2tlbi5jbGFzcy1uYW1lIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLWphdmEgLnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtbWFya3VwIC50b2tlbi5hdHRyLXZhbHVlIHtcclxuXHRcdGNvbG9yOiByZ2JhKDEwMiwgMjE3LCAyMzksIDEpO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW1hcmt1cCAudG9rZW4udGFnIHtcclxuXHRcdGNvbG9yOiByZ2JhKDgwLCAyNTAsIDEyMywgMSk7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2Utb2JqZWN0aXZlYyAudG9rZW4ucHJvcGVydHkge1xyXG5cdFx0Y29sb3I6ICM2NmQ5ZWY7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2Utb2JqZWN0aXZlYyAudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiAjNTBmYTdiO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLXBocCAudG9rZW4uYm9vbGVhbiB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1waHAgLnRva2VuLmZ1bmN0aW9uIHtcclxuXHRcdGNvbG9yOiAjZmY3OWM2O1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLXBocCAudG9rZW4ua2V5d29yZCB7XHJcblx0XHRjb2xvcjogIzY2ZDllZjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1ydWJ5IC50b2tlbi5zeW1ib2wge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcnVieSAudG9rZW4uY2xhc3MtbmFtZSB7XHJcblx0XHRjb2xvcjogI2NmY2ZjMjtcclxuXHR9XHJcblxyXG5cdHByZS5saW5lLW51bWJlcnMge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0cGFkZGluZy1sZWZ0OiAzLjhlbTtcclxuXHRcdGNvdW50ZXItcmVzZXQ6IGxpbmVudW1iZXI7XHJcblx0fVxyXG5cclxuXHRwcmUubGluZS1udW1iZXJzID4gY29kZSB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHR3aGl0ZS1zcGFjZTogaW5oZXJpdDtcclxuXHR9XHJcblxyXG5cdC5saW5lLW51bWJlcnMgLmxpbmUtbnVtYmVycy1yb3dzIHtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG5cdFx0dG9wOiAwO1xyXG5cdFx0Zm9udC1zaXplOiAxMDAlO1xyXG5cdFx0bGVmdDogLTMuOGVtO1xyXG5cdFx0d2lkdGg6IDNlbTtcclxuXHRcdC8qIHdvcmtzIGZvciBsaW5lLW51bWJlcnMgYmVsb3cgMTAwMCBsaW5lcyAqL1xyXG5cdFx0bGV0dGVyLXNwYWNpbmc6IC0xcHg7XHJcblx0XHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjOTk5O1xyXG5cdFx0LXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuXHRcdC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHQtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHR1c2VyLXNlbGVjdDogbm9uZTtcclxuXHR9XHJcblxyXG5cdC5saW5lLW51bWJlcnMtcm93cyA+IHNwYW4ge1xyXG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XHJcblx0XHRkaXNwbGF5OiBibG9jaztcclxuXHRcdGNvdW50ZXItaW5jcmVtZW50OiBsaW5lbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0LmxpbmUtbnVtYmVycy1yb3dzID4gc3BhbjpiZWZvcmUge1xyXG5cdFx0Y29udGVudDogY291bnRlcihsaW5lbnVtYmVyKTtcclxuXHRcdGNvbG9yOiAjOTk5O1xyXG5cdFx0ZGlzcGxheTogYmxvY2s7XHJcblx0XHRwYWRkaW5nLXJpZ2h0OiAwLjhlbTtcclxuXHRcdHRleHQtYWxpZ246IHJpZ2h0O1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIge1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAwLjNlbTtcclxuXHRcdHJpZ2h0OiAwLjJlbTtcclxuXHRcdHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLWluLW91dDtcclxuXHRcdG9wYWNpdHk6IDA7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyOmhvdmVyID4gLnRvb2xiYXIge1xyXG5cdFx0b3BhY2l0eTogMTtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciAudG9vbGJhci1pdGVtIHtcclxuXHRcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuXHRcdHBhZGRpbmctcmlnaHQ6IDIwcHg7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYSB7XHJcblx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYnV0dG9uIHtcclxuXHRcdGJhY2tncm91bmQ6IG5vbmU7XHJcblx0XHRib3JkZXI6IDA7XHJcblx0XHRjb2xvcjogaW5oZXJpdDtcclxuXHRcdGZvbnQ6IGluaGVyaXQ7XHJcblx0XHRsaW5lLWhlaWdodDogbm9ybWFsO1xyXG5cdFx0b3ZlcmZsb3c6IHZpc2libGU7XHJcblx0XHRwYWRkaW5nOiAwO1xyXG5cdFx0LXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuXHRcdC8qIGZvciBidXR0b24gKi9cclxuXHRcdC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHQtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYSxcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYnV0dG9uLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBzcGFuIHtcclxuXHRcdGNvbG9yOiAjY2NjO1xyXG5cdFx0Zm9udC1zaXplOiAwLjhlbTtcclxuXHRcdHBhZGRpbmc6IDAuNWVtO1xyXG5cdFx0YmFja2dyb3VuZDogcmdiYSg5OCwgMTE0LCAxNjQsIDEpO1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMC41ZW07XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYTpob3ZlcixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYTpmb2N1cyxcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYnV0dG9uOmhvdmVyLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBidXR0b246Zm9jdXMsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIHNwYW46aG92ZXIsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIHNwYW46Zm9jdXMge1xyXG5cdFx0Y29sb3I6IGluaGVyaXQ7XHJcblx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS12ZXJkZSk7XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgcmVzZXRTdHlsZSA9IGNzc2BcclxuXHQvKiEgbWluaXJlc2V0LmNzcyB2MC4wLjYgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vamd0aG1zL21pbmlyZXNldC5jc3MgKi9cclxuXHRibG9ja3F1b3RlLFxyXG5cdGJvZHksXHJcblx0ZGQsXHJcblx0ZGwsXHJcblx0ZHQsXHJcblx0ZmllbGRzZXQsXHJcblx0ZmlndXJlLFxyXG5cdGgxLFxyXG5cdGgyLFxyXG5cdGgzLFxyXG5cdGg0LFxyXG5cdGg1LFxyXG5cdGg2LFxyXG5cdGhyLFxyXG5cdGh0bWwsXHJcblx0aWZyYW1lLFxyXG5cdGxlZ2VuZCxcclxuXHRsaSxcclxuXHRvbCxcclxuXHRwLFxyXG5cdHByZSxcclxuXHR0ZXh0YXJlYSxcclxuXHR1bCB7XHJcblx0XHRtYXJnaW46IDA7XHJcblx0XHRwYWRkaW5nOiAwO1xyXG5cdH1cclxuXHRoMSxcclxuXHRoMixcclxuXHRoMyxcclxuXHRoNCxcclxuXHRoNSxcclxuXHRoNiB7XHJcblx0XHRmb250LXNpemU6IDEwMCU7XHJcblx0XHRmb250LXdlaWdodDogNDAwO1xyXG5cdH1cclxuXHR1bCB7XHJcblx0XHRsaXN0LXN0eWxlOiBub25lO1xyXG5cdH1cclxuXHRidXR0b24sXHJcblx0aW5wdXQsXHJcblx0c2VsZWN0IHtcclxuXHRcdG1hcmdpbjogMDtcclxuXHR9XHJcblx0aHRtbCB7XHJcblx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdH1cclxuXHQqLFxyXG5cdDphZnRlcixcclxuXHQ6YmVmb3JlIHtcclxuXHRcdGJveC1zaXppbmc6IGluaGVyaXQ7XHJcblx0fVxyXG5cdGltZyxcclxuXHR2aWRlbyB7XHJcblx0XHRoZWlnaHQ6IGF1dG87XHJcblx0XHRtYXgtd2lkdGg6IDEwMCU7XHJcblx0fVxyXG5cdGlmcmFtZSB7XHJcblx0XHRib3JkZXI6IDA7XHJcblx0fVxyXG5cdHRhYmxlIHtcclxuXHRcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcblx0XHRib3JkZXItc3BhY2luZzogMDtcclxuXHR9XHJcblx0dGQsXHJcblx0dGgge1xyXG5cdFx0cGFkZGluZzogMDtcclxuXHR9XHJcblx0YSB7XHJcblx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcblx0XHRjb2xvcjogdmFyKC0tY29sb3JzLXRleHQpO1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGNvbW1vblN0eWxlID0gY3NzYFxyXG5cdDpyb290IHtcclxuXHRcdC0tY29sb3JzLXByaW1hcnk6IHJnYig3NiwgMjA5LCA1NSk7XHJcblx0XHQtLWNvbG9ycy1iYWNrZ3JvdW5kMjogcmdiKDExMywgMTI4LCAxNDcpO1xyXG5cdFx0LS1jb2xvcnMtYW5jaG9yOiByZ2IoMCwgMTY4LCAyNTUpO1xyXG5cdFx0LS1jb2xvcnMtc2Vjb25kYXJ5LXRleHQ6ICM5ZTllOWU7XHJcblx0XHQtLWNvbG9ycy10aXAtYmFja2dyb3VuZDogIzkzOTM5MztcclxuXHRcdC0tY29sb3JzLWFib3V0LWxpbmstaWNvbjogI2E4YThhODtcclxuXHRcdC0tY29sb3JzLXBhc3RlOiAjYWNiYWM3YTg7XHJcblx0XHQtLWNvbG9ycy1wYXN0ZS1ob3ZlcjogI2FjYmFjNztcclxuXHR9XHJcblxyXG5cdGh0bWwge1xyXG5cdFx0b3ZlcmZsb3cteTogc2Nyb2xsO1xyXG5cdH1cclxuXHJcblx0Lyog7Iqk7YGs66Gk67CU7J2YIO2PrSDrhIjruYQgKi9cclxuXHQ6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuXHRcdHdpZHRoOiA1cHg7XHJcblx0XHRoZWlnaHQ6IDhweDtcclxuXHR9XHJcblxyXG5cdDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG5cdFx0YmFja2dyb3VuZDogIzY2NjY2NjZhOyAvKiDsiqTtgazroaTrsJQg7IOJ7IOBICovXHJcblx0XHRib3JkZXItcmFkaXVzOiAxMHB4OyAvKiDsiqTtgazroaTrsJQg65Gl6re8IO2FjOuRkOumrCAqL1xyXG5cdH1cclxuXHJcblx0Ojotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcblx0XHRiYWNrZ3JvdW5kOiAjZGRkOyAvKuyKpO2BrOuhpOuwlCDrkrcg67Cw6rK9IOyDieyDgSovXHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgbGlnaHRTdGx5ZSA9IGNzc2BcclxuXHRib2R5W2RhdGEtdGhlbWU9J2xpZ2h0J10ge1xyXG5cdFx0LS1jb2xvcnMtdGV4dDogYmxhY2s7XHJcblx0XHQtLWNvbG9ycy1iYWNrZ3JvdW5kOiB3aGl0ZTtcclxuXHRcdC0tY29sb3JzLXRhYi10ZXh0OiAjNmU2ZDdhO1xyXG5cdFx0LS1jb2xvcnMtdGFiLXNlbGVjdGVkOiAjMGQwYzIyO1xyXG5cdFx0LS1jb2xvcnMtdGFiLXNlbGVjdGVkLWJhY2tncm91bmQ6IHJnYmEoMTMsIDEyLCAzNCwgMC4wNSk7XHJcblx0XHQtLWNvbG9ycy1wb3N0LWNhcmQtYm9yZGVyOiByZ2JhKDAsIDAsIDAsIDAuMTIpO1xyXG5cdFx0LS1jb2xvcnMtYmxvY2txdW90ZS1ib3JkZXI6IHJnYmEoMjU1LCA5MiwgMCwgMC43KTtcclxuXHRcdC0tY29sb3JzLWNvbnRlbnQtdGV4dDogIzM3MzUyZjtcclxuXHRcdC0tY29sb3JzLWFib3V0LWxpbmstaWNvbi1ob3ZlcjogcmdiYSgwLCAwLCAwLCAwLjA2KTtcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYmFja2dyb3VuZDogI2YyZmZlZTc1O1xyXG5cdFx0JHtwcmlzbX1cclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBkYXJrU3R5bGUgPSBjc3NgXHJcblx0Ym9keVtkYXRhLXRoZW1lPSdkYXJrJ10ge1xyXG5cdFx0LS1jb2xvcnMtdGV4dDogd2hpdGU7XHJcblx0XHQtLWNvbG9ycy1iYWNrZ3JvdW5kOiBibGFjaztcclxuXHRcdC0tY29sb3JzLXRhYi10ZXh0OiAjNzY4MzkwO1xyXG5cdFx0LS1jb2xvcnMtdGFiLXNlbGVjdGVkOiAjYWNiYWM3O1xyXG5cdFx0LS1jb2xvcnMtdGFiLXNlbGVjdGVkLWJhY2tncm91bmQ6ICMzNzNlNDc7XHJcblx0XHQtLWNvbG9ycy1wb3N0LWNhcmQtYm9yZGVyOiAjMzYzZjQ3O1xyXG5cdFx0LS1jb2xvcnMtYmxvY2txdW90ZS1ib3JkZXI6ICNmZjVjMDA7XHJcblx0XHQtLWNvbG9ycy1jb250ZW50LXRleHQ6ICNlNmU2ZTY7XHJcblx0XHQtLWNvbG9ycy1hYm91dC1saW5rLWljb24taG92ZXI6IHJnYmEoMjEzLCAyMTMsIDIxMywgMC4yNik7XHJcblx0XHQtLWNvbG9ycy1ibG9ja3F1b3RlLWJhY2tncm91bmQ6ICNmYWZiZmMyYjtcclxuXHRcdCR7ZGFya31cclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBkZWZhdWx0U3R5bGUgPSBjc3NgXHJcblx0JHtyZXNldFN0eWxlfTtcclxuXHQke2NvbW1vblN0eWxlfTtcclxuXHQke2xpZ2h0U3RseWV9O1xyXG5cdCR7ZGFya1N0eWxlfTtcclxuYDtcclxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$a
};
const dark = process.env.NODE_ENV === "production" ? {
  name: "1ofe2hx",
  styles: "code[class*='language-'],pre[class*='language-']{color:#ccc;background:rgb(40, 41, 54);}pre{text-shadow:none;background-color:#5a5f80;}:not(pre)>code[class*='language-']{border-radius:0.3em;white-space:normal;}pre{color:#ccc;background:rgb(40, 41, 54);}.limit-300{height:300px!important;}.limit-400{height:400px!important;}.limit-500{height:500px!important;}.limit-600{height:600px!important;}.limit-700{height:700px!important;}.limit-800{height:800px!important;}.token.comment{color:rgba(98, 114, 164, 1);}.token.prolog{color:rgba(207, 207, 194, 1);}.token.tag{color:rgba(220, 104, 170, 1);}.token.entity{color:rgba(139, 233, 253, 1);}.token.atrule{color:rgba(98, 239, 117, 1);}.token.url{color:rgba(102, 217, 239, 1);}.token.selector{color:rgba(207, 207, 194, 1);}.token.string{color:rgba(241, 250, 140, 1);}.token.property{color:rgba(255, 184, 108, 1);}.token.important{color:rgba(255, 121, 198, 1);font-weight:bold;}.token.punctuation{color:rgba(230, 219, 116, 1);}.token.number{color:rgba(189, 147, 249, 1);}.token.function{color:rgba(80, 250, 123, 1);}.token.class-name{color:rgba(255, 184, 108, 1);}.token.keyword{color:rgba(255, 121, 198, 1);}.token.boolean{color:rgba(255, 184, 108, 1);}.token.operator{color:rgba(139, 233, 253, 1);}.token.char{color:rgba(255, 135, 157, 1);}.token.regex{color:rgba(80, 250, 123, 1);}.token.variable{color:rgba(80, 250, 123, 1);}.token.constant{color:rgba(255, 184, 108, 1);}.token.symbol{color:rgba(255, 184, 108, 1);}.token.builtin{color:rgba(255, 121, 198, 1);}.token.attr-value{color:#7ec699;}.token.deleted{color:#e2777a;}.token.namespace{color:#e2777a;}.token.bold{font-weight:bold;}.token.italic{font-style:italic;}.token{color:#ff79c6;}.langague-cpp .token.string{color:#8be9fd;}.langague-c .token.string{color:#8be9fd;}.language-css .token.selector{color:rgba(80, 250, 123, 1);}.language-css .token.property{color:rgba(255, 184, 108, 1);}.language-java span.token.class-name{color:#8be9fd;}.language-java .token.class-name{color:#8be9fd;}.language-markup .token.attr-value{color:rgba(102, 217, 239, 1);}.language-markup .token.tag{color:rgba(80, 250, 123, 1);}.language-objectivec .token.property{color:#66d9ef;}.language-objectivec .token.string{color:#50fa7b;}.language-php .token.boolean{color:#8be9fd;}.language-php .token.function{color:#ff79c6;}.language-php .token.keyword{color:#66d9ef;}.language-ruby .token.symbol{color:#8be9fd;}.language-ruby .token.class-name{color:#cfcfc2;}pre.line-numbers{position:relative;padding-left:3.8em;counter-reset:linenumber;}pre.line-numbers>code{position:relative;white-space:inherit;}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.line-numbers-rows>span{pointer-events:none;display:block;counter-increment:linenumber;}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:0.8em;text-align:right;}div.code-toolbar{position:relative;}div.code-toolbar>.toolbar{position:absolute;top:0.3em;right:0.2em;transition:opacity 0.3s ease-in-out;opacity:0;}div.code-toolbar:hover>.toolbar{opacity:1;}div.code-toolbar>.toolbar .toolbar-item{display:inline-block;padding-right:20px;}div.code-toolbar>.toolbar a{cursor:pointer;}div.code-toolbar>.toolbar button{background:none;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;}div.code-toolbar>.toolbar a,div.code-toolbar>.toolbar button,div.code-toolbar>.toolbar span{color:#ccc;font-size:0.8em;padding:0.5em;background:rgba(98, 114, 164, 1);border-radius:0.5em;}div.code-toolbar>.toolbar a:hover,div.code-toolbar>.toolbar a:focus,div.code-toolbar>.toolbar button:hover,div.code-toolbar>.toolbar button:focus,div.code-toolbar>.toolbar span:hover,div.code-toolbar>.toolbar span:focus{color:inherit;text-decoration:none;background-color:var(--verde);}"
} : {
  name: "1jg7uoi-dark",
  styles: "code[class*='language-'],pre[class*='language-']{color:#ccc;background:rgb(40, 41, 54);}pre{text-shadow:none;background-color:#5a5f80;}:not(pre)>code[class*='language-']{border-radius:0.3em;white-space:normal;}pre{color:#ccc;background:rgb(40, 41, 54);}.limit-300{height:300px!important;}.limit-400{height:400px!important;}.limit-500{height:500px!important;}.limit-600{height:600px!important;}.limit-700{height:700px!important;}.limit-800{height:800px!important;}.token.comment{color:rgba(98, 114, 164, 1);}.token.prolog{color:rgba(207, 207, 194, 1);}.token.tag{color:rgba(220, 104, 170, 1);}.token.entity{color:rgba(139, 233, 253, 1);}.token.atrule{color:rgba(98, 239, 117, 1);}.token.url{color:rgba(102, 217, 239, 1);}.token.selector{color:rgba(207, 207, 194, 1);}.token.string{color:rgba(241, 250, 140, 1);}.token.property{color:rgba(255, 184, 108, 1);}.token.important{color:rgba(255, 121, 198, 1);font-weight:bold;}.token.punctuation{color:rgba(230, 219, 116, 1);}.token.number{color:rgba(189, 147, 249, 1);}.token.function{color:rgba(80, 250, 123, 1);}.token.class-name{color:rgba(255, 184, 108, 1);}.token.keyword{color:rgba(255, 121, 198, 1);}.token.boolean{color:rgba(255, 184, 108, 1);}.token.operator{color:rgba(139, 233, 253, 1);}.token.char{color:rgba(255, 135, 157, 1);}.token.regex{color:rgba(80, 250, 123, 1);}.token.variable{color:rgba(80, 250, 123, 1);}.token.constant{color:rgba(255, 184, 108, 1);}.token.symbol{color:rgba(255, 184, 108, 1);}.token.builtin{color:rgba(255, 121, 198, 1);}.token.attr-value{color:#7ec699;}.token.deleted{color:#e2777a;}.token.namespace{color:#e2777a;}.token.bold{font-weight:bold;}.token.italic{font-style:italic;}.token{color:#ff79c6;}.langague-cpp .token.string{color:#8be9fd;}.langague-c .token.string{color:#8be9fd;}.language-css .token.selector{color:rgba(80, 250, 123, 1);}.language-css .token.property{color:rgba(255, 184, 108, 1);}.language-java span.token.class-name{color:#8be9fd;}.language-java .token.class-name{color:#8be9fd;}.language-markup .token.attr-value{color:rgba(102, 217, 239, 1);}.language-markup .token.tag{color:rgba(80, 250, 123, 1);}.language-objectivec .token.property{color:#66d9ef;}.language-objectivec .token.string{color:#50fa7b;}.language-php .token.boolean{color:#8be9fd;}.language-php .token.function{color:#ff79c6;}.language-php .token.keyword{color:#66d9ef;}.language-ruby .token.symbol{color:#8be9fd;}.language-ruby .token.class-name{color:#cfcfc2;}pre.line-numbers{position:relative;padding-left:3.8em;counter-reset:linenumber;}pre.line-numbers>code{position:relative;white-space:inherit;}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.line-numbers-rows>span{pointer-events:none;display:block;counter-increment:linenumber;}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:0.8em;text-align:right;}div.code-toolbar{position:relative;}div.code-toolbar>.toolbar{position:absolute;top:0.3em;right:0.2em;transition:opacity 0.3s ease-in-out;opacity:0;}div.code-toolbar:hover>.toolbar{opacity:1;}div.code-toolbar>.toolbar .toolbar-item{display:inline-block;padding-right:20px;}div.code-toolbar>.toolbar a{cursor:pointer;}div.code-toolbar>.toolbar button{background:none;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;}div.code-toolbar>.toolbar a,div.code-toolbar>.toolbar button,div.code-toolbar>.toolbar span{color:#ccc;font-size:0.8em;padding:0.5em;background:rgba(98, 114, 164, 1);border-radius:0.5em;}div.code-toolbar>.toolbar a:hover,div.code-toolbar>.toolbar a:focus,div.code-toolbar>.toolbar button:hover,div.code-toolbar>.toolbar button:focus,div.code-toolbar>.toolbar span:hover,div.code-toolbar>.toolbar span:focus{color:inherit;text-decoration:none;background-color:var(--verde);};label:dark;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrRWdCIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdsb2JhbCwgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBHbG9iYWxTdHlsZTogRnVuY3Rpb25Db21wb25lbnQgPSAoKSA9PiB7XHJcblx0cmV0dXJuIDxHbG9iYWwgc3R5bGVzPXtkZWZhdWx0U3R5bGV9IC8+O1xyXG59O1xyXG5cclxuY29uc3QgcHJpc20gPSBjc3NgXHJcblx0Y29kZSxcclxuXHRjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10sXHJcblx0cHJlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xyXG5cdFx0Y29sb3I6ICMyNDI5MmU7XHJcblx0fVxyXG5cdHByZSB7XHJcblx0XHRjb2xvcjogIzI0MjkyZTtcclxuXHRcdGJhY2tncm91bmQ6ICNmNmY4ZmE7XHJcblx0fVxyXG5cdC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogIzAwNWNjNTtcclxuXHR9XHJcblx0LnRva2VuLmNvbW1lbnQsXHJcblx0LnRva2VuLnByb2xvZyxcclxuXHQudG9rZW4uZG9jdHlwZSxcclxuXHQudG9rZW4uY2RhdGEge1xyXG5cdFx0Y29sb3I6ICM5Njk4OTY7XHJcblx0fVxyXG5cdC50b2tlbi5wdW5jdHVhdGlvbiB7XHJcblx0XHRjb2xvcjogIzI0MjkyZTtcclxuXHR9XHJcblx0LnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzAzMmY2MjtcclxuXHR9XHJcblx0LnRva2VuLmF0cnVsZSxcclxuXHQudG9rZW4uYXR0ci12YWx1ZSB7XHJcblx0XHRjb2xvcjogIzE4MzY5MTtcclxuXHR9XHJcblx0LnRva2VuLnByb3BlcnR5LFxyXG5cdC50b2tlbi50YWcge1xyXG5cdFx0Y29sb3I6ICM2M2EzNWM7XHJcblx0fVxyXG5cdC50b2tlbi5ib29sZWFuLFxyXG5cdC50b2tlbi5udW1iZXIge1xyXG5cdFx0Y29sb3I6ICMwMDg2YjM7XHJcblx0fVxyXG5cdC50b2tlbi5zZWxlY3RvcixcclxuXHQudG9rZW4uYXR0ci1uYW1lLFxyXG5cdC50b2tlbi5hdHRyLXZhbHVlIC5wdW5jdHVhdGlvbjpmaXJzdC1vZi10eXBlLFxyXG5cdC50b2tlbi5rZXl3b3JkLFxyXG5cdC50b2tlbi5yZWdleCxcclxuXHQudG9rZW4uaW1wb3J0YW50IHtcclxuXHRcdGNvbG9yOiAjZDczYTQ5O1xyXG5cdH1cclxuXHQudG9rZW4ub3BlcmF0b3IsXHJcblx0LnRva2VuLmVudGl0eSxcclxuXHQudG9rZW4udXJsLFxyXG5cdC5sYW5ndWFnZS1jc3Mge1xyXG5cdFx0Y29sb3I6ICNkNzNhNDk7XHJcblx0fVxyXG5cdC50b2tlbi5lbnRpdHkge1xyXG5cdFx0Y3Vyc29yOiBoZWxwO1xyXG5cdH1cclxuXHQubmFtZXNwYWNlIHtcclxuXHRcdG9wYWNpdHk6IDAuNztcclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBkYXJrID0gY3NzYFxyXG5cdGNvZGVbY2xhc3MqPSdsYW5ndWFnZS0nXSxcclxuXHRwcmVbY2xhc3MqPSdsYW5ndWFnZS0nXSB7XHJcblx0XHRjb2xvcjogI2NjYztcclxuXHRcdGJhY2tncm91bmQ6IHJnYig0MCwgNDEsIDU0KTtcclxuXHR9XHJcblxyXG5cdHByZSB7XHJcblx0XHR0ZXh0LXNoYWRvdzogbm9uZTtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6ICM1YTVmODA7XHJcblx0fVxyXG5cclxuXHQvKiBJbmxpbmUgY29kZSAqL1xyXG5cclxuXHQ6bm90KHByZSkgPiBjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMC4zZW07XHJcblx0XHR3aGl0ZS1zcGFjZTogbm9ybWFsO1xyXG5cdH1cclxuXHJcblx0cHJlIHtcclxuXHRcdGNvbG9yOiAjY2NjO1xyXG5cdFx0YmFja2dyb3VuZDogcmdiKDQwLCA0MSwgNTQpO1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTMwMCB7XHJcblx0XHRoZWlnaHQ6IDMwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNDAwIHtcclxuXHRcdGhlaWdodDogNDAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC01MDAge1xyXG5cdFx0aGVpZ2h0OiA1MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTYwMCB7XHJcblx0XHRoZWlnaHQ6IDYwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNzAwIHtcclxuXHRcdGhlaWdodDogNzAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC04MDAge1xyXG5cdFx0aGVpZ2h0OiA4MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNvbW1lbnQge1xyXG5cdFx0Y29sb3I6IHJnYmEoOTgsIDExNCwgMTY0LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5wcm9sb2cge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjA3LCAyMDcsIDE5NCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4udGFnIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIyMCwgMTA0LCAxNzAsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmVudGl0eSB7XHJcblx0XHRjb2xvcjogcmdiYSgxMzksIDIzMywgMjUzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5hdHJ1bGUge1xyXG5cdFx0Y29sb3I6IHJnYmEoOTgsIDIzOSwgMTE3LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi51cmwge1xyXG5cdFx0Y29sb3I6IHJnYmEoMTAyLCAyMTcsIDIzOSwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uc2VsZWN0b3Ige1xyXG5cdFx0Y29sb3I6IHJnYmEoMjA3LCAyMDcsIDE5NCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI0MSwgMjUwLCAxNDAsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnByb3BlcnR5IHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmltcG9ydGFudCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEyMSwgMTk4LCAxKTtcclxuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnB1bmN0dWF0aW9uIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIzMCwgMjE5LCAxMTYsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLm51bWJlciB7XHJcblx0XHRjb2xvcjogcmdiYSgxODksIDE0NywgMjQ5LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ua2V5d29yZCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEyMSwgMTk4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5ib29sZWFuIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLm9wZXJhdG9yIHtcclxuXHRcdGNvbG9yOiByZ2JhKDEzOSwgMjMzLCAyNTMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNoYXIge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxMzUsIDE1NywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ucmVnZXgge1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi52YXJpYWJsZSB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNvbnN0YW50IHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnN5bWJvbCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5idWlsdGluIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTIxLCAxOTgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmF0dHItdmFsdWUge1xyXG5cdFx0Y29sb3I6ICM3ZWM2OTk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uZGVsZXRlZCB7XHJcblx0XHRjb2xvcjogI2UyNzc3YTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5uYW1lc3BhY2Uge1xyXG5cdFx0Y29sb3I6ICNlMjc3N2E7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYm9sZCB7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5pdGFsaWMge1xyXG5cdFx0Zm9udC1zdHlsZTogaXRhbGljO1xyXG5cdH1cclxuXHJcblx0LnRva2VuIHtcclxuXHRcdGNvbG9yOiAjZmY3OWM2O1xyXG5cdH1cclxuXHJcblx0LmxhbmdhZ3VlLWNwcCAudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0LmxhbmdhZ3VlLWMgLnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1jc3MgLnRva2VuLnNlbGVjdG9yIHtcclxuXHRcdGNvbG9yOiByZ2JhKDgwLCAyNTAsIDEyMywgMSk7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtY3NzIC50b2tlbi5wcm9wZXJ0eSB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1qYXZhIHNwYW4udG9rZW4uY2xhc3MtbmFtZSB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1qYXZhIC50b2tlbi5jbGFzcy1uYW1lIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW1hcmt1cCAudG9rZW4uYXR0ci12YWx1ZSB7XHJcblx0XHRjb2xvcjogcmdiYSgxMDIsIDIxNywgMjM5LCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1tYXJrdXAgLnRva2VuLnRhZyB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW9iamVjdGl2ZWMgLnRva2VuLnByb3BlcnR5IHtcclxuXHRcdGNvbG9yOiAjNjZkOWVmO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW9iamVjdGl2ZWMgLnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzUwZmE3YjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1waHAgLnRva2VuLmJvb2xlYW4ge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcGhwIC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogI2ZmNzljNjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1waHAgLnRva2VuLmtleXdvcmQge1xyXG5cdFx0Y29sb3I6ICM2NmQ5ZWY7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcnVieSAudG9rZW4uc3ltYm9sIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLXJ1YnkgLnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6ICNjZmNmYzI7XHJcblx0fVxyXG5cclxuXHRwcmUubGluZS1udW1iZXJzIHtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdHBhZGRpbmctbGVmdDogMy44ZW07XHJcblx0XHRjb3VudGVyLXJlc2V0OiBsaW5lbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0cHJlLmxpbmUtbnVtYmVycyA+IGNvZGUge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0d2hpdGUtc3BhY2U6IGluaGVyaXQ7XHJcblx0fVxyXG5cclxuXHQubGluZS1udW1iZXJzIC5saW5lLW51bWJlcnMtcm93cyB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZTtcclxuXHRcdHRvcDogMDtcclxuXHRcdGZvbnQtc2l6ZTogMTAwJTtcclxuXHRcdGxlZnQ6IC0zLjhlbTtcclxuXHRcdHdpZHRoOiAzZW07XHJcblx0XHQvKiB3b3JrcyBmb3IgbGluZS1udW1iZXJzIGJlbG93IDEwMDAgbGluZXMgKi9cclxuXHRcdGxldHRlci1zcGFjaW5nOiAtMXB4O1xyXG5cdFx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzk5OTtcclxuXHRcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0dXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0fVxyXG5cclxuXHQubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuIHtcclxuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG5cdFx0ZGlzcGxheTogYmxvY2s7XHJcblx0XHRjb3VudGVyLWluY3JlbWVudDogbGluZW51bWJlcjtcclxuXHR9XHJcblxyXG5cdC5saW5lLW51bWJlcnMtcm93cyA+IHNwYW46YmVmb3JlIHtcclxuXHRcdGNvbnRlbnQ6IGNvdW50ZXIobGluZW51bWJlcik7XHJcblx0XHRjb2xvcjogIzk5OTtcclxuXHRcdGRpc3BsYXk6IGJsb2NrO1xyXG5cdFx0cGFkZGluZy1yaWdodDogMC44ZW07XHJcblx0XHR0ZXh0LWFsaWduOiByaWdodDtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIHtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogMC4zZW07XHJcblx0XHRyaWdodDogMC4yZW07XHJcblx0XHR0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXQ7XHJcblx0XHRvcGFjaXR5OiAwO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhcjpob3ZlciA+IC50b29sYmFyIHtcclxuXHRcdG9wYWNpdHk6IDE7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgLnRvb2xiYXItaXRlbSB7XHJcblx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcblx0XHRwYWRkaW5nLXJpZ2h0OiAyMHB4O1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGEge1xyXG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbiB7XHJcblx0XHRiYWNrZ3JvdW5kOiBub25lO1xyXG5cdFx0Ym9yZGVyOiAwO1xyXG5cdFx0Y29sb3I6IGluaGVyaXQ7XHJcblx0XHRmb250OiBpbmhlcml0O1xyXG5cdFx0bGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuXHRcdG92ZXJmbG93OiB2aXNpYmxlO1xyXG5cdFx0cGFkZGluZzogMDtcclxuXHRcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHQvKiBmb3IgYnV0dG9uICovXHJcblx0XHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGEsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgc3BhbiB7XHJcblx0XHRjb2xvcjogI2NjYztcclxuXHRcdGZvbnQtc2l6ZTogMC44ZW07XHJcblx0XHRwYWRkaW5nOiAwLjVlbTtcclxuXHRcdGJhY2tncm91bmQ6IHJnYmEoOTgsIDExNCwgMTY0LCAxKTtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGE6aG92ZXIsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGE6Zm9jdXMsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbjpob3ZlcixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYnV0dG9uOmZvY3VzLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBzcGFuOmhvdmVyLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBzcGFuOmZvY3VzIHtcclxuXHRcdGNvbG9yOiBpbmhlcml0O1xyXG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdmVyZGUpO1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IHJlc2V0U3R5bGUgPSBjc3NgXHJcblx0LyohIG1pbmlyZXNldC5jc3MgdjAuMC42IHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL2pndGhtcy9taW5pcmVzZXQuY3NzICovXHJcblx0YmxvY2txdW90ZSxcclxuXHRib2R5LFxyXG5cdGRkLFxyXG5cdGRsLFxyXG5cdGR0LFxyXG5cdGZpZWxkc2V0LFxyXG5cdGZpZ3VyZSxcclxuXHRoMSxcclxuXHRoMixcclxuXHRoMyxcclxuXHRoNCxcclxuXHRoNSxcclxuXHRoNixcclxuXHRocixcclxuXHRodG1sLFxyXG5cdGlmcmFtZSxcclxuXHRsZWdlbmQsXHJcblx0bGksXHJcblx0b2wsXHJcblx0cCxcclxuXHRwcmUsXHJcblx0dGV4dGFyZWEsXHJcblx0dWwge1xyXG5cdFx0bWFyZ2luOiAwO1xyXG5cdFx0cGFkZGluZzogMDtcclxuXHR9XHJcblx0aDEsXHJcblx0aDIsXHJcblx0aDMsXHJcblx0aDQsXHJcblx0aDUsXHJcblx0aDYge1xyXG5cdFx0Zm9udC1zaXplOiAxMDAlO1xyXG5cdFx0Zm9udC13ZWlnaHQ6IDQwMDtcclxuXHR9XHJcblx0dWwge1xyXG5cdFx0bGlzdC1zdHlsZTogbm9uZTtcclxuXHR9XHJcblx0YnV0dG9uLFxyXG5cdGlucHV0LFxyXG5cdHNlbGVjdCB7XHJcblx0XHRtYXJnaW46IDA7XHJcblx0fVxyXG5cdGh0bWwge1xyXG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuXHR9XHJcblx0KixcclxuXHQ6YWZ0ZXIsXHJcblx0OmJlZm9yZSB7XHJcblx0XHRib3gtc2l6aW5nOiBpbmhlcml0O1xyXG5cdH1cclxuXHRpbWcsXHJcblx0dmlkZW8ge1xyXG5cdFx0aGVpZ2h0OiBhdXRvO1xyXG5cdFx0bWF4LXdpZHRoOiAxMDAlO1xyXG5cdH1cclxuXHRpZnJhbWUge1xyXG5cdFx0Ym9yZGVyOiAwO1xyXG5cdH1cclxuXHR0YWJsZSB7XHJcblx0XHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG5cdFx0Ym9yZGVyLXNwYWNpbmc6IDA7XHJcblx0fVxyXG5cdHRkLFxyXG5cdHRoIHtcclxuXHRcdHBhZGRpbmc6IDA7XHJcblx0fVxyXG5cdGEge1xyXG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cdFx0Y29sb3I6IHZhcigtLWNvbG9ycy10ZXh0KTtcclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBjb21tb25TdHlsZSA9IGNzc2BcclxuXHQ6cm9vdCB7XHJcblx0XHQtLWNvbG9ycy1wcmltYXJ5OiByZ2IoNzYsIDIwOSwgNTUpO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDI6IHJnYigxMTMsIDEyOCwgMTQ3KTtcclxuXHRcdC0tY29sb3JzLWFuY2hvcjogcmdiKDAsIDE2OCwgMjU1KTtcclxuXHRcdC0tY29sb3JzLXNlY29uZGFyeS10ZXh0OiAjOWU5ZTllO1xyXG5cdFx0LS1jb2xvcnMtdGlwLWJhY2tncm91bmQ6ICM5MzkzOTM7XHJcblx0XHQtLWNvbG9ycy1hYm91dC1saW5rLWljb246ICNhOGE4YTg7XHJcblx0XHQtLWNvbG9ycy1wYXN0ZTogI2FjYmFjN2E4O1xyXG5cdFx0LS1jb2xvcnMtcGFzdGUtaG92ZXI6ICNhY2JhYzc7XHJcblx0fVxyXG5cclxuXHRodG1sIHtcclxuXHRcdG92ZXJmbG93LXk6IHNjcm9sbDtcclxuXHR9XHJcblxyXG5cdC8qIOyKpO2BrOuhpOuwlOydmCDtj60g64SI67mEICovXHJcblx0Ojotd2Via2l0LXNjcm9sbGJhciB7XHJcblx0XHR3aWR0aDogNXB4O1xyXG5cdFx0aGVpZ2h0OiA4cHg7XHJcblx0fVxyXG5cclxuXHQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuXHRcdGJhY2tncm91bmQ6ICM2NjY2NjY2YTsgLyog7Iqk7YGs66Gk67CUIOyDieyDgSAqL1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMTBweDsgLyog7Iqk7YGs66Gk67CUIOuRpeq3vCDthYzrkZDrpqwgKi9cclxuXHR9XHJcblxyXG5cdDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG5cdFx0YmFja2dyb3VuZDogI2RkZDsgLyrsiqTtgazroaTrsJQg65K3IOuwsOqyvSDsg4nsg4EqL1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGxpZ2h0U3RseWUgPSBjc3NgXHJcblx0Ym9keVtkYXRhLXRoZW1lPSdsaWdodCddIHtcclxuXHRcdC0tY29sb3JzLXRleHQ6IGJsYWNrO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDogd2hpdGU7XHJcblx0XHQtLWNvbG9ycy10YWItdGV4dDogIzZlNmQ3YTtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZDogIzBkMGMyMjtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZC1iYWNrZ3JvdW5kOiByZ2JhKDEzLCAxMiwgMzQsIDAuMDUpO1xyXG5cdFx0LS1jb2xvcnMtcG9zdC1jYXJkLWJvcmRlcjogcmdiYSgwLCAwLCAwLCAwLjEyKTtcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYm9yZGVyOiByZ2JhKDI1NSwgOTIsIDAsIDAuNyk7XHJcblx0XHQtLWNvbG9ycy1jb250ZW50LXRleHQ6ICMzNzM1MmY7XHJcblx0XHQtLWNvbG9ycy1hYm91dC1saW5rLWljb24taG92ZXI6IHJnYmEoMCwgMCwgMCwgMC4wNik7XHJcblx0XHQtLWNvbG9ycy1ibG9ja3F1b3RlLWJhY2tncm91bmQ6ICNmMmZmZWU3NTtcclxuXHRcdCR7cHJpc219XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgZGFya1N0eWxlID0gY3NzYFxyXG5cdGJvZHlbZGF0YS10aGVtZT0nZGFyayddIHtcclxuXHRcdC0tY29sb3JzLXRleHQ6IHdoaXRlO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDogYmxhY2s7XHJcblx0XHQtLWNvbG9ycy10YWItdGV4dDogIzc2ODM5MDtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZDogI2FjYmFjNztcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZC1iYWNrZ3JvdW5kOiAjMzczZTQ3O1xyXG5cdFx0LS1jb2xvcnMtcG9zdC1jYXJkLWJvcmRlcjogIzM2M2Y0NztcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYm9yZGVyOiAjZmY1YzAwO1xyXG5cdFx0LS1jb2xvcnMtY29udGVudC10ZXh0OiAjZTZlNmU2O1xyXG5cdFx0LS1jb2xvcnMtYWJvdXQtbGluay1pY29uLWhvdmVyOiByZ2JhKDIxMywgMjEzLCAyMTMsIDAuMjYpO1xyXG5cdFx0LS1jb2xvcnMtYmxvY2txdW90ZS1iYWNrZ3JvdW5kOiAjZmFmYmZjMmI7XHJcblx0XHQke2Rhcmt9XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgZGVmYXVsdFN0eWxlID0gY3NzYFxyXG5cdCR7cmVzZXRTdHlsZX07XHJcblx0JHtjb21tb25TdHlsZX07XHJcblx0JHtsaWdodFN0bHllfTtcclxuXHQke2RhcmtTdHlsZX07XHJcbmA7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$a
};
const resetStyle = process.env.NODE_ENV === "production" ? {
  name: "1yfc63i",
  styles: "blockquote,body,dd,dl,dt,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,html,iframe,legend,li,ol,p,pre,textarea,ul{margin:0;padding:0;}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400;}ul{list-style:none;}button,input,select{margin:0;}html{box-sizing:border-box;}*,:after,:before{box-sizing:inherit;}img,video{height:auto;max-width:100%;}iframe{border:0;}table{border-collapse:collapse;border-spacing:0;}td,th{padding:0;}a{text-decoration:none;color:var(--colors-text);}"
} : {
  name: "161xsgo-resetStyle",
  styles: "blockquote,body,dd,dl,dt,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,html,iframe,legend,li,ol,p,pre,textarea,ul{margin:0;padding:0;}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400;}ul{list-style:none;}button,input,select{margin:0;}html{box-sizing:border-box;}*,:after,:before{box-sizing:inherit;}img,video{height:auto;max-width:100%;}iframe{border:0;}table{border-collapse:collapse;border-spacing:0;}td,th{padding:0;}a{text-decoration:none;color:var(--colors-text);};label:resetStyle;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5WXNCIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdsb2JhbCwgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBHbG9iYWxTdHlsZTogRnVuY3Rpb25Db21wb25lbnQgPSAoKSA9PiB7XHJcblx0cmV0dXJuIDxHbG9iYWwgc3R5bGVzPXtkZWZhdWx0U3R5bGV9IC8+O1xyXG59O1xyXG5cclxuY29uc3QgcHJpc20gPSBjc3NgXHJcblx0Y29kZSxcclxuXHRjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10sXHJcblx0cHJlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xyXG5cdFx0Y29sb3I6ICMyNDI5MmU7XHJcblx0fVxyXG5cdHByZSB7XHJcblx0XHRjb2xvcjogIzI0MjkyZTtcclxuXHRcdGJhY2tncm91bmQ6ICNmNmY4ZmE7XHJcblx0fVxyXG5cdC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogIzAwNWNjNTtcclxuXHR9XHJcblx0LnRva2VuLmNvbW1lbnQsXHJcblx0LnRva2VuLnByb2xvZyxcclxuXHQudG9rZW4uZG9jdHlwZSxcclxuXHQudG9rZW4uY2RhdGEge1xyXG5cdFx0Y29sb3I6ICM5Njk4OTY7XHJcblx0fVxyXG5cdC50b2tlbi5wdW5jdHVhdGlvbiB7XHJcblx0XHRjb2xvcjogIzI0MjkyZTtcclxuXHR9XHJcblx0LnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzAzMmY2MjtcclxuXHR9XHJcblx0LnRva2VuLmF0cnVsZSxcclxuXHQudG9rZW4uYXR0ci12YWx1ZSB7XHJcblx0XHRjb2xvcjogIzE4MzY5MTtcclxuXHR9XHJcblx0LnRva2VuLnByb3BlcnR5LFxyXG5cdC50b2tlbi50YWcge1xyXG5cdFx0Y29sb3I6ICM2M2EzNWM7XHJcblx0fVxyXG5cdC50b2tlbi5ib29sZWFuLFxyXG5cdC50b2tlbi5udW1iZXIge1xyXG5cdFx0Y29sb3I6ICMwMDg2YjM7XHJcblx0fVxyXG5cdC50b2tlbi5zZWxlY3RvcixcclxuXHQudG9rZW4uYXR0ci1uYW1lLFxyXG5cdC50b2tlbi5hdHRyLXZhbHVlIC5wdW5jdHVhdGlvbjpmaXJzdC1vZi10eXBlLFxyXG5cdC50b2tlbi5rZXl3b3JkLFxyXG5cdC50b2tlbi5yZWdleCxcclxuXHQudG9rZW4uaW1wb3J0YW50IHtcclxuXHRcdGNvbG9yOiAjZDczYTQ5O1xyXG5cdH1cclxuXHQudG9rZW4ub3BlcmF0b3IsXHJcblx0LnRva2VuLmVudGl0eSxcclxuXHQudG9rZW4udXJsLFxyXG5cdC5sYW5ndWFnZS1jc3Mge1xyXG5cdFx0Y29sb3I6ICNkNzNhNDk7XHJcblx0fVxyXG5cdC50b2tlbi5lbnRpdHkge1xyXG5cdFx0Y3Vyc29yOiBoZWxwO1xyXG5cdH1cclxuXHQubmFtZXNwYWNlIHtcclxuXHRcdG9wYWNpdHk6IDAuNztcclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBkYXJrID0gY3NzYFxyXG5cdGNvZGVbY2xhc3MqPSdsYW5ndWFnZS0nXSxcclxuXHRwcmVbY2xhc3MqPSdsYW5ndWFnZS0nXSB7XHJcblx0XHRjb2xvcjogI2NjYztcclxuXHRcdGJhY2tncm91bmQ6IHJnYig0MCwgNDEsIDU0KTtcclxuXHR9XHJcblxyXG5cdHByZSB7XHJcblx0XHR0ZXh0LXNoYWRvdzogbm9uZTtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6ICM1YTVmODA7XHJcblx0fVxyXG5cclxuXHQvKiBJbmxpbmUgY29kZSAqL1xyXG5cclxuXHQ6bm90KHByZSkgPiBjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMC4zZW07XHJcblx0XHR3aGl0ZS1zcGFjZTogbm9ybWFsO1xyXG5cdH1cclxuXHJcblx0cHJlIHtcclxuXHRcdGNvbG9yOiAjY2NjO1xyXG5cdFx0YmFja2dyb3VuZDogcmdiKDQwLCA0MSwgNTQpO1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTMwMCB7XHJcblx0XHRoZWlnaHQ6IDMwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNDAwIHtcclxuXHRcdGhlaWdodDogNDAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC01MDAge1xyXG5cdFx0aGVpZ2h0OiA1MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTYwMCB7XHJcblx0XHRoZWlnaHQ6IDYwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNzAwIHtcclxuXHRcdGhlaWdodDogNzAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC04MDAge1xyXG5cdFx0aGVpZ2h0OiA4MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNvbW1lbnQge1xyXG5cdFx0Y29sb3I6IHJnYmEoOTgsIDExNCwgMTY0LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5wcm9sb2cge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjA3LCAyMDcsIDE5NCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4udGFnIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIyMCwgMTA0LCAxNzAsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmVudGl0eSB7XHJcblx0XHRjb2xvcjogcmdiYSgxMzksIDIzMywgMjUzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5hdHJ1bGUge1xyXG5cdFx0Y29sb3I6IHJnYmEoOTgsIDIzOSwgMTE3LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi51cmwge1xyXG5cdFx0Y29sb3I6IHJnYmEoMTAyLCAyMTcsIDIzOSwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uc2VsZWN0b3Ige1xyXG5cdFx0Y29sb3I6IHJnYmEoMjA3LCAyMDcsIDE5NCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI0MSwgMjUwLCAxNDAsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnByb3BlcnR5IHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmltcG9ydGFudCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEyMSwgMTk4LCAxKTtcclxuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnB1bmN0dWF0aW9uIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIzMCwgMjE5LCAxMTYsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLm51bWJlciB7XHJcblx0XHRjb2xvcjogcmdiYSgxODksIDE0NywgMjQ5LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ua2V5d29yZCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEyMSwgMTk4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5ib29sZWFuIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLm9wZXJhdG9yIHtcclxuXHRcdGNvbG9yOiByZ2JhKDEzOSwgMjMzLCAyNTMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNoYXIge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxMzUsIDE1NywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ucmVnZXgge1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi52YXJpYWJsZSB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNvbnN0YW50IHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnN5bWJvbCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5idWlsdGluIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTIxLCAxOTgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmF0dHItdmFsdWUge1xyXG5cdFx0Y29sb3I6ICM3ZWM2OTk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uZGVsZXRlZCB7XHJcblx0XHRjb2xvcjogI2UyNzc3YTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5uYW1lc3BhY2Uge1xyXG5cdFx0Y29sb3I6ICNlMjc3N2E7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYm9sZCB7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5pdGFsaWMge1xyXG5cdFx0Zm9udC1zdHlsZTogaXRhbGljO1xyXG5cdH1cclxuXHJcblx0LnRva2VuIHtcclxuXHRcdGNvbG9yOiAjZmY3OWM2O1xyXG5cdH1cclxuXHJcblx0LmxhbmdhZ3VlLWNwcCAudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0LmxhbmdhZ3VlLWMgLnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1jc3MgLnRva2VuLnNlbGVjdG9yIHtcclxuXHRcdGNvbG9yOiByZ2JhKDgwLCAyNTAsIDEyMywgMSk7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtY3NzIC50b2tlbi5wcm9wZXJ0eSB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1qYXZhIHNwYW4udG9rZW4uY2xhc3MtbmFtZSB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1qYXZhIC50b2tlbi5jbGFzcy1uYW1lIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW1hcmt1cCAudG9rZW4uYXR0ci12YWx1ZSB7XHJcblx0XHRjb2xvcjogcmdiYSgxMDIsIDIxNywgMjM5LCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1tYXJrdXAgLnRva2VuLnRhZyB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW9iamVjdGl2ZWMgLnRva2VuLnByb3BlcnR5IHtcclxuXHRcdGNvbG9yOiAjNjZkOWVmO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW9iamVjdGl2ZWMgLnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzUwZmE3YjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1waHAgLnRva2VuLmJvb2xlYW4ge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcGhwIC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogI2ZmNzljNjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1waHAgLnRva2VuLmtleXdvcmQge1xyXG5cdFx0Y29sb3I6ICM2NmQ5ZWY7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcnVieSAudG9rZW4uc3ltYm9sIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLXJ1YnkgLnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6ICNjZmNmYzI7XHJcblx0fVxyXG5cclxuXHRwcmUubGluZS1udW1iZXJzIHtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdHBhZGRpbmctbGVmdDogMy44ZW07XHJcblx0XHRjb3VudGVyLXJlc2V0OiBsaW5lbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0cHJlLmxpbmUtbnVtYmVycyA+IGNvZGUge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0d2hpdGUtc3BhY2U6IGluaGVyaXQ7XHJcblx0fVxyXG5cclxuXHQubGluZS1udW1iZXJzIC5saW5lLW51bWJlcnMtcm93cyB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZTtcclxuXHRcdHRvcDogMDtcclxuXHRcdGZvbnQtc2l6ZTogMTAwJTtcclxuXHRcdGxlZnQ6IC0zLjhlbTtcclxuXHRcdHdpZHRoOiAzZW07XHJcblx0XHQvKiB3b3JrcyBmb3IgbGluZS1udW1iZXJzIGJlbG93IDEwMDAgbGluZXMgKi9cclxuXHRcdGxldHRlci1zcGFjaW5nOiAtMXB4O1xyXG5cdFx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzk5OTtcclxuXHRcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0dXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0fVxyXG5cclxuXHQubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuIHtcclxuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG5cdFx0ZGlzcGxheTogYmxvY2s7XHJcblx0XHRjb3VudGVyLWluY3JlbWVudDogbGluZW51bWJlcjtcclxuXHR9XHJcblxyXG5cdC5saW5lLW51bWJlcnMtcm93cyA+IHNwYW46YmVmb3JlIHtcclxuXHRcdGNvbnRlbnQ6IGNvdW50ZXIobGluZW51bWJlcik7XHJcblx0XHRjb2xvcjogIzk5OTtcclxuXHRcdGRpc3BsYXk6IGJsb2NrO1xyXG5cdFx0cGFkZGluZy1yaWdodDogMC44ZW07XHJcblx0XHR0ZXh0LWFsaWduOiByaWdodDtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIHtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogMC4zZW07XHJcblx0XHRyaWdodDogMC4yZW07XHJcblx0XHR0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXQ7XHJcblx0XHRvcGFjaXR5OiAwO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhcjpob3ZlciA+IC50b29sYmFyIHtcclxuXHRcdG9wYWNpdHk6IDE7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgLnRvb2xiYXItaXRlbSB7XHJcblx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcblx0XHRwYWRkaW5nLXJpZ2h0OiAyMHB4O1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGEge1xyXG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbiB7XHJcblx0XHRiYWNrZ3JvdW5kOiBub25lO1xyXG5cdFx0Ym9yZGVyOiAwO1xyXG5cdFx0Y29sb3I6IGluaGVyaXQ7XHJcblx0XHRmb250OiBpbmhlcml0O1xyXG5cdFx0bGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuXHRcdG92ZXJmbG93OiB2aXNpYmxlO1xyXG5cdFx0cGFkZGluZzogMDtcclxuXHRcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHQvKiBmb3IgYnV0dG9uICovXHJcblx0XHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGEsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgc3BhbiB7XHJcblx0XHRjb2xvcjogI2NjYztcclxuXHRcdGZvbnQtc2l6ZTogMC44ZW07XHJcblx0XHRwYWRkaW5nOiAwLjVlbTtcclxuXHRcdGJhY2tncm91bmQ6IHJnYmEoOTgsIDExNCwgMTY0LCAxKTtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGE6aG92ZXIsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGE6Zm9jdXMsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbjpob3ZlcixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYnV0dG9uOmZvY3VzLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBzcGFuOmhvdmVyLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBzcGFuOmZvY3VzIHtcclxuXHRcdGNvbG9yOiBpbmhlcml0O1xyXG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdmVyZGUpO1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IHJlc2V0U3R5bGUgPSBjc3NgXHJcblx0LyohIG1pbmlyZXNldC5jc3MgdjAuMC42IHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL2pndGhtcy9taW5pcmVzZXQuY3NzICovXHJcblx0YmxvY2txdW90ZSxcclxuXHRib2R5LFxyXG5cdGRkLFxyXG5cdGRsLFxyXG5cdGR0LFxyXG5cdGZpZWxkc2V0LFxyXG5cdGZpZ3VyZSxcclxuXHRoMSxcclxuXHRoMixcclxuXHRoMyxcclxuXHRoNCxcclxuXHRoNSxcclxuXHRoNixcclxuXHRocixcclxuXHRodG1sLFxyXG5cdGlmcmFtZSxcclxuXHRsZWdlbmQsXHJcblx0bGksXHJcblx0b2wsXHJcblx0cCxcclxuXHRwcmUsXHJcblx0dGV4dGFyZWEsXHJcblx0dWwge1xyXG5cdFx0bWFyZ2luOiAwO1xyXG5cdFx0cGFkZGluZzogMDtcclxuXHR9XHJcblx0aDEsXHJcblx0aDIsXHJcblx0aDMsXHJcblx0aDQsXHJcblx0aDUsXHJcblx0aDYge1xyXG5cdFx0Zm9udC1zaXplOiAxMDAlO1xyXG5cdFx0Zm9udC13ZWlnaHQ6IDQwMDtcclxuXHR9XHJcblx0dWwge1xyXG5cdFx0bGlzdC1zdHlsZTogbm9uZTtcclxuXHR9XHJcblx0YnV0dG9uLFxyXG5cdGlucHV0LFxyXG5cdHNlbGVjdCB7XHJcblx0XHRtYXJnaW46IDA7XHJcblx0fVxyXG5cdGh0bWwge1xyXG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuXHR9XHJcblx0KixcclxuXHQ6YWZ0ZXIsXHJcblx0OmJlZm9yZSB7XHJcblx0XHRib3gtc2l6aW5nOiBpbmhlcml0O1xyXG5cdH1cclxuXHRpbWcsXHJcblx0dmlkZW8ge1xyXG5cdFx0aGVpZ2h0OiBhdXRvO1xyXG5cdFx0bWF4LXdpZHRoOiAxMDAlO1xyXG5cdH1cclxuXHRpZnJhbWUge1xyXG5cdFx0Ym9yZGVyOiAwO1xyXG5cdH1cclxuXHR0YWJsZSB7XHJcblx0XHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG5cdFx0Ym9yZGVyLXNwYWNpbmc6IDA7XHJcblx0fVxyXG5cdHRkLFxyXG5cdHRoIHtcclxuXHRcdHBhZGRpbmc6IDA7XHJcblx0fVxyXG5cdGEge1xyXG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cdFx0Y29sb3I6IHZhcigtLWNvbG9ycy10ZXh0KTtcclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBjb21tb25TdHlsZSA9IGNzc2BcclxuXHQ6cm9vdCB7XHJcblx0XHQtLWNvbG9ycy1wcmltYXJ5OiByZ2IoNzYsIDIwOSwgNTUpO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDI6IHJnYigxMTMsIDEyOCwgMTQ3KTtcclxuXHRcdC0tY29sb3JzLWFuY2hvcjogcmdiKDAsIDE2OCwgMjU1KTtcclxuXHRcdC0tY29sb3JzLXNlY29uZGFyeS10ZXh0OiAjOWU5ZTllO1xyXG5cdFx0LS1jb2xvcnMtdGlwLWJhY2tncm91bmQ6ICM5MzkzOTM7XHJcblx0XHQtLWNvbG9ycy1hYm91dC1saW5rLWljb246ICNhOGE4YTg7XHJcblx0XHQtLWNvbG9ycy1wYXN0ZTogI2FjYmFjN2E4O1xyXG5cdFx0LS1jb2xvcnMtcGFzdGUtaG92ZXI6ICNhY2JhYzc7XHJcblx0fVxyXG5cclxuXHRodG1sIHtcclxuXHRcdG92ZXJmbG93LXk6IHNjcm9sbDtcclxuXHR9XHJcblxyXG5cdC8qIOyKpO2BrOuhpOuwlOydmCDtj60g64SI67mEICovXHJcblx0Ojotd2Via2l0LXNjcm9sbGJhciB7XHJcblx0XHR3aWR0aDogNXB4O1xyXG5cdFx0aGVpZ2h0OiA4cHg7XHJcblx0fVxyXG5cclxuXHQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuXHRcdGJhY2tncm91bmQ6ICM2NjY2NjY2YTsgLyog7Iqk7YGs66Gk67CUIOyDieyDgSAqL1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMTBweDsgLyog7Iqk7YGs66Gk67CUIOuRpeq3vCDthYzrkZDrpqwgKi9cclxuXHR9XHJcblxyXG5cdDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG5cdFx0YmFja2dyb3VuZDogI2RkZDsgLyrsiqTtgazroaTrsJQg65K3IOuwsOqyvSDsg4nsg4EqL1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGxpZ2h0U3RseWUgPSBjc3NgXHJcblx0Ym9keVtkYXRhLXRoZW1lPSdsaWdodCddIHtcclxuXHRcdC0tY29sb3JzLXRleHQ6IGJsYWNrO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDogd2hpdGU7XHJcblx0XHQtLWNvbG9ycy10YWItdGV4dDogIzZlNmQ3YTtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZDogIzBkMGMyMjtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZC1iYWNrZ3JvdW5kOiByZ2JhKDEzLCAxMiwgMzQsIDAuMDUpO1xyXG5cdFx0LS1jb2xvcnMtcG9zdC1jYXJkLWJvcmRlcjogcmdiYSgwLCAwLCAwLCAwLjEyKTtcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYm9yZGVyOiByZ2JhKDI1NSwgOTIsIDAsIDAuNyk7XHJcblx0XHQtLWNvbG9ycy1jb250ZW50LXRleHQ6ICMzNzM1MmY7XHJcblx0XHQtLWNvbG9ycy1hYm91dC1saW5rLWljb24taG92ZXI6IHJnYmEoMCwgMCwgMCwgMC4wNik7XHJcblx0XHQtLWNvbG9ycy1ibG9ja3F1b3RlLWJhY2tncm91bmQ6ICNmMmZmZWU3NTtcclxuXHRcdCR7cHJpc219XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgZGFya1N0eWxlID0gY3NzYFxyXG5cdGJvZHlbZGF0YS10aGVtZT0nZGFyayddIHtcclxuXHRcdC0tY29sb3JzLXRleHQ6IHdoaXRlO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDogYmxhY2s7XHJcblx0XHQtLWNvbG9ycy10YWItdGV4dDogIzc2ODM5MDtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZDogI2FjYmFjNztcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZC1iYWNrZ3JvdW5kOiAjMzczZTQ3O1xyXG5cdFx0LS1jb2xvcnMtcG9zdC1jYXJkLWJvcmRlcjogIzM2M2Y0NztcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYm9yZGVyOiAjZmY1YzAwO1xyXG5cdFx0LS1jb2xvcnMtY29udGVudC10ZXh0OiAjZTZlNmU2O1xyXG5cdFx0LS1jb2xvcnMtYWJvdXQtbGluay1pY29uLWhvdmVyOiByZ2JhKDIxMywgMjEzLCAyMTMsIDAuMjYpO1xyXG5cdFx0LS1jb2xvcnMtYmxvY2txdW90ZS1iYWNrZ3JvdW5kOiAjZmFmYmZjMmI7XHJcblx0XHQke2Rhcmt9XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgZGVmYXVsdFN0eWxlID0gY3NzYFxyXG5cdCR7cmVzZXRTdHlsZX07XHJcblx0JHtjb21tb25TdHlsZX07XHJcblx0JHtsaWdodFN0bHllfTtcclxuXHQke2RhcmtTdHlsZX07XHJcbmA7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$a
};
const commonStyle = process.env.NODE_ENV === "production" ? {
  name: "172ve2y",
  styles: ":root{--colors-primary:rgb(76, 209, 55);--colors-background2:rgb(113, 128, 147);--colors-anchor:rgb(0, 168, 255);--colors-secondary-text:#9e9e9e;--colors-tip-background:#939393;--colors-about-link-icon:#a8a8a8;--colors-paste:#acbac7a8;--colors-paste-hover:#acbac7;}html{overflow-y:scroll;}::-webkit-scrollbar{width:5px;height:8px;}::-webkit-scrollbar-thumb{background:#6666666a;border-radius:10px;}::-webkit-scrollbar-track{background:#ddd;}"
} : {
  name: "1rqu23a-commonStyle",
  styles: ":root{--colors-primary:rgb(76, 209, 55);--colors-background2:rgb(113, 128, 147);--colors-anchor:rgb(0, 168, 255);--colors-secondary-text:#9e9e9e;--colors-tip-background:#939393;--colors-about-link-icon:#a8a8a8;--colors-paste:#acbac7a8;--colors-paste-hover:#acbac7;}html{overflow-y:scroll;}::-webkit-scrollbar{width:5px;height:8px;}::-webkit-scrollbar-thumb{background:#6666666a;border-radius:10px;}::-webkit-scrollbar-track{background:#ddd;};label:commonStyle;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvZHVCIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdsb2JhbCwgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBHbG9iYWxTdHlsZTogRnVuY3Rpb25Db21wb25lbnQgPSAoKSA9PiB7XHJcblx0cmV0dXJuIDxHbG9iYWwgc3R5bGVzPXtkZWZhdWx0U3R5bGV9IC8+O1xyXG59O1xyXG5cclxuY29uc3QgcHJpc20gPSBjc3NgXHJcblx0Y29kZSxcclxuXHRjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10sXHJcblx0cHJlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xyXG5cdFx0Y29sb3I6ICMyNDI5MmU7XHJcblx0fVxyXG5cdHByZSB7XHJcblx0XHRjb2xvcjogIzI0MjkyZTtcclxuXHRcdGJhY2tncm91bmQ6ICNmNmY4ZmE7XHJcblx0fVxyXG5cdC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogIzAwNWNjNTtcclxuXHR9XHJcblx0LnRva2VuLmNvbW1lbnQsXHJcblx0LnRva2VuLnByb2xvZyxcclxuXHQudG9rZW4uZG9jdHlwZSxcclxuXHQudG9rZW4uY2RhdGEge1xyXG5cdFx0Y29sb3I6ICM5Njk4OTY7XHJcblx0fVxyXG5cdC50b2tlbi5wdW5jdHVhdGlvbiB7XHJcblx0XHRjb2xvcjogIzI0MjkyZTtcclxuXHR9XHJcblx0LnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzAzMmY2MjtcclxuXHR9XHJcblx0LnRva2VuLmF0cnVsZSxcclxuXHQudG9rZW4uYXR0ci12YWx1ZSB7XHJcblx0XHRjb2xvcjogIzE4MzY5MTtcclxuXHR9XHJcblx0LnRva2VuLnByb3BlcnR5LFxyXG5cdC50b2tlbi50YWcge1xyXG5cdFx0Y29sb3I6ICM2M2EzNWM7XHJcblx0fVxyXG5cdC50b2tlbi5ib29sZWFuLFxyXG5cdC50b2tlbi5udW1iZXIge1xyXG5cdFx0Y29sb3I6ICMwMDg2YjM7XHJcblx0fVxyXG5cdC50b2tlbi5zZWxlY3RvcixcclxuXHQudG9rZW4uYXR0ci1uYW1lLFxyXG5cdC50b2tlbi5hdHRyLXZhbHVlIC5wdW5jdHVhdGlvbjpmaXJzdC1vZi10eXBlLFxyXG5cdC50b2tlbi5rZXl3b3JkLFxyXG5cdC50b2tlbi5yZWdleCxcclxuXHQudG9rZW4uaW1wb3J0YW50IHtcclxuXHRcdGNvbG9yOiAjZDczYTQ5O1xyXG5cdH1cclxuXHQudG9rZW4ub3BlcmF0b3IsXHJcblx0LnRva2VuLmVudGl0eSxcclxuXHQudG9rZW4udXJsLFxyXG5cdC5sYW5ndWFnZS1jc3Mge1xyXG5cdFx0Y29sb3I6ICNkNzNhNDk7XHJcblx0fVxyXG5cdC50b2tlbi5lbnRpdHkge1xyXG5cdFx0Y3Vyc29yOiBoZWxwO1xyXG5cdH1cclxuXHQubmFtZXNwYWNlIHtcclxuXHRcdG9wYWNpdHk6IDAuNztcclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBkYXJrID0gY3NzYFxyXG5cdGNvZGVbY2xhc3MqPSdsYW5ndWFnZS0nXSxcclxuXHRwcmVbY2xhc3MqPSdsYW5ndWFnZS0nXSB7XHJcblx0XHRjb2xvcjogI2NjYztcclxuXHRcdGJhY2tncm91bmQ6IHJnYig0MCwgNDEsIDU0KTtcclxuXHR9XHJcblxyXG5cdHByZSB7XHJcblx0XHR0ZXh0LXNoYWRvdzogbm9uZTtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6ICM1YTVmODA7XHJcblx0fVxyXG5cclxuXHQvKiBJbmxpbmUgY29kZSAqL1xyXG5cclxuXHQ6bm90KHByZSkgPiBjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMC4zZW07XHJcblx0XHR3aGl0ZS1zcGFjZTogbm9ybWFsO1xyXG5cdH1cclxuXHJcblx0cHJlIHtcclxuXHRcdGNvbG9yOiAjY2NjO1xyXG5cdFx0YmFja2dyb3VuZDogcmdiKDQwLCA0MSwgNTQpO1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTMwMCB7XHJcblx0XHRoZWlnaHQ6IDMwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNDAwIHtcclxuXHRcdGhlaWdodDogNDAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC01MDAge1xyXG5cdFx0aGVpZ2h0OiA1MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTYwMCB7XHJcblx0XHRoZWlnaHQ6IDYwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNzAwIHtcclxuXHRcdGhlaWdodDogNzAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC04MDAge1xyXG5cdFx0aGVpZ2h0OiA4MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNvbW1lbnQge1xyXG5cdFx0Y29sb3I6IHJnYmEoOTgsIDExNCwgMTY0LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5wcm9sb2cge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjA3LCAyMDcsIDE5NCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4udGFnIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIyMCwgMTA0LCAxNzAsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmVudGl0eSB7XHJcblx0XHRjb2xvcjogcmdiYSgxMzksIDIzMywgMjUzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5hdHJ1bGUge1xyXG5cdFx0Y29sb3I6IHJnYmEoOTgsIDIzOSwgMTE3LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi51cmwge1xyXG5cdFx0Y29sb3I6IHJnYmEoMTAyLCAyMTcsIDIzOSwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uc2VsZWN0b3Ige1xyXG5cdFx0Y29sb3I6IHJnYmEoMjA3LCAyMDcsIDE5NCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI0MSwgMjUwLCAxNDAsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnByb3BlcnR5IHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmltcG9ydGFudCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEyMSwgMTk4LCAxKTtcclxuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnB1bmN0dWF0aW9uIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIzMCwgMjE5LCAxMTYsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLm51bWJlciB7XHJcblx0XHRjb2xvcjogcmdiYSgxODksIDE0NywgMjQ5LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ua2V5d29yZCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEyMSwgMTk4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5ib29sZWFuIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLm9wZXJhdG9yIHtcclxuXHRcdGNvbG9yOiByZ2JhKDEzOSwgMjMzLCAyNTMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNoYXIge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxMzUsIDE1NywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ucmVnZXgge1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi52YXJpYWJsZSB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNvbnN0YW50IHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnN5bWJvbCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5idWlsdGluIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTIxLCAxOTgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmF0dHItdmFsdWUge1xyXG5cdFx0Y29sb3I6ICM3ZWM2OTk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uZGVsZXRlZCB7XHJcblx0XHRjb2xvcjogI2UyNzc3YTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5uYW1lc3BhY2Uge1xyXG5cdFx0Y29sb3I6ICNlMjc3N2E7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYm9sZCB7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5pdGFsaWMge1xyXG5cdFx0Zm9udC1zdHlsZTogaXRhbGljO1xyXG5cdH1cclxuXHJcblx0LnRva2VuIHtcclxuXHRcdGNvbG9yOiAjZmY3OWM2O1xyXG5cdH1cclxuXHJcblx0LmxhbmdhZ3VlLWNwcCAudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0LmxhbmdhZ3VlLWMgLnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1jc3MgLnRva2VuLnNlbGVjdG9yIHtcclxuXHRcdGNvbG9yOiByZ2JhKDgwLCAyNTAsIDEyMywgMSk7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtY3NzIC50b2tlbi5wcm9wZXJ0eSB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1qYXZhIHNwYW4udG9rZW4uY2xhc3MtbmFtZSB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1qYXZhIC50b2tlbi5jbGFzcy1uYW1lIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW1hcmt1cCAudG9rZW4uYXR0ci12YWx1ZSB7XHJcblx0XHRjb2xvcjogcmdiYSgxMDIsIDIxNywgMjM5LCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1tYXJrdXAgLnRva2VuLnRhZyB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW9iamVjdGl2ZWMgLnRva2VuLnByb3BlcnR5IHtcclxuXHRcdGNvbG9yOiAjNjZkOWVmO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW9iamVjdGl2ZWMgLnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzUwZmE3YjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1waHAgLnRva2VuLmJvb2xlYW4ge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcGhwIC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogI2ZmNzljNjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1waHAgLnRva2VuLmtleXdvcmQge1xyXG5cdFx0Y29sb3I6ICM2NmQ5ZWY7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcnVieSAudG9rZW4uc3ltYm9sIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLXJ1YnkgLnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6ICNjZmNmYzI7XHJcblx0fVxyXG5cclxuXHRwcmUubGluZS1udW1iZXJzIHtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdHBhZGRpbmctbGVmdDogMy44ZW07XHJcblx0XHRjb3VudGVyLXJlc2V0OiBsaW5lbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0cHJlLmxpbmUtbnVtYmVycyA+IGNvZGUge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0d2hpdGUtc3BhY2U6IGluaGVyaXQ7XHJcblx0fVxyXG5cclxuXHQubGluZS1udW1iZXJzIC5saW5lLW51bWJlcnMtcm93cyB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZTtcclxuXHRcdHRvcDogMDtcclxuXHRcdGZvbnQtc2l6ZTogMTAwJTtcclxuXHRcdGxlZnQ6IC0zLjhlbTtcclxuXHRcdHdpZHRoOiAzZW07XHJcblx0XHQvKiB3b3JrcyBmb3IgbGluZS1udW1iZXJzIGJlbG93IDEwMDAgbGluZXMgKi9cclxuXHRcdGxldHRlci1zcGFjaW5nOiAtMXB4O1xyXG5cdFx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzk5OTtcclxuXHRcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0dXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0fVxyXG5cclxuXHQubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuIHtcclxuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG5cdFx0ZGlzcGxheTogYmxvY2s7XHJcblx0XHRjb3VudGVyLWluY3JlbWVudDogbGluZW51bWJlcjtcclxuXHR9XHJcblxyXG5cdC5saW5lLW51bWJlcnMtcm93cyA+IHNwYW46YmVmb3JlIHtcclxuXHRcdGNvbnRlbnQ6IGNvdW50ZXIobGluZW51bWJlcik7XHJcblx0XHRjb2xvcjogIzk5OTtcclxuXHRcdGRpc3BsYXk6IGJsb2NrO1xyXG5cdFx0cGFkZGluZy1yaWdodDogMC44ZW07XHJcblx0XHR0ZXh0LWFsaWduOiByaWdodDtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIHtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogMC4zZW07XHJcblx0XHRyaWdodDogMC4yZW07XHJcblx0XHR0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXQ7XHJcblx0XHRvcGFjaXR5OiAwO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhcjpob3ZlciA+IC50b29sYmFyIHtcclxuXHRcdG9wYWNpdHk6IDE7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgLnRvb2xiYXItaXRlbSB7XHJcblx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcblx0XHRwYWRkaW5nLXJpZ2h0OiAyMHB4O1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGEge1xyXG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbiB7XHJcblx0XHRiYWNrZ3JvdW5kOiBub25lO1xyXG5cdFx0Ym9yZGVyOiAwO1xyXG5cdFx0Y29sb3I6IGluaGVyaXQ7XHJcblx0XHRmb250OiBpbmhlcml0O1xyXG5cdFx0bGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuXHRcdG92ZXJmbG93OiB2aXNpYmxlO1xyXG5cdFx0cGFkZGluZzogMDtcclxuXHRcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHQvKiBmb3IgYnV0dG9uICovXHJcblx0XHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGEsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgc3BhbiB7XHJcblx0XHRjb2xvcjogI2NjYztcclxuXHRcdGZvbnQtc2l6ZTogMC44ZW07XHJcblx0XHRwYWRkaW5nOiAwLjVlbTtcclxuXHRcdGJhY2tncm91bmQ6IHJnYmEoOTgsIDExNCwgMTY0LCAxKTtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGE6aG92ZXIsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGE6Zm9jdXMsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbjpob3ZlcixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYnV0dG9uOmZvY3VzLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBzcGFuOmhvdmVyLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBzcGFuOmZvY3VzIHtcclxuXHRcdGNvbG9yOiBpbmhlcml0O1xyXG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdmVyZGUpO1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IHJlc2V0U3R5bGUgPSBjc3NgXHJcblx0LyohIG1pbmlyZXNldC5jc3MgdjAuMC42IHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL2pndGhtcy9taW5pcmVzZXQuY3NzICovXHJcblx0YmxvY2txdW90ZSxcclxuXHRib2R5LFxyXG5cdGRkLFxyXG5cdGRsLFxyXG5cdGR0LFxyXG5cdGZpZWxkc2V0LFxyXG5cdGZpZ3VyZSxcclxuXHRoMSxcclxuXHRoMixcclxuXHRoMyxcclxuXHRoNCxcclxuXHRoNSxcclxuXHRoNixcclxuXHRocixcclxuXHRodG1sLFxyXG5cdGlmcmFtZSxcclxuXHRsZWdlbmQsXHJcblx0bGksXHJcblx0b2wsXHJcblx0cCxcclxuXHRwcmUsXHJcblx0dGV4dGFyZWEsXHJcblx0dWwge1xyXG5cdFx0bWFyZ2luOiAwO1xyXG5cdFx0cGFkZGluZzogMDtcclxuXHR9XHJcblx0aDEsXHJcblx0aDIsXHJcblx0aDMsXHJcblx0aDQsXHJcblx0aDUsXHJcblx0aDYge1xyXG5cdFx0Zm9udC1zaXplOiAxMDAlO1xyXG5cdFx0Zm9udC13ZWlnaHQ6IDQwMDtcclxuXHR9XHJcblx0dWwge1xyXG5cdFx0bGlzdC1zdHlsZTogbm9uZTtcclxuXHR9XHJcblx0YnV0dG9uLFxyXG5cdGlucHV0LFxyXG5cdHNlbGVjdCB7XHJcblx0XHRtYXJnaW46IDA7XHJcblx0fVxyXG5cdGh0bWwge1xyXG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuXHR9XHJcblx0KixcclxuXHQ6YWZ0ZXIsXHJcblx0OmJlZm9yZSB7XHJcblx0XHRib3gtc2l6aW5nOiBpbmhlcml0O1xyXG5cdH1cclxuXHRpbWcsXHJcblx0dmlkZW8ge1xyXG5cdFx0aGVpZ2h0OiBhdXRvO1xyXG5cdFx0bWF4LXdpZHRoOiAxMDAlO1xyXG5cdH1cclxuXHRpZnJhbWUge1xyXG5cdFx0Ym9yZGVyOiAwO1xyXG5cdH1cclxuXHR0YWJsZSB7XHJcblx0XHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG5cdFx0Ym9yZGVyLXNwYWNpbmc6IDA7XHJcblx0fVxyXG5cdHRkLFxyXG5cdHRoIHtcclxuXHRcdHBhZGRpbmc6IDA7XHJcblx0fVxyXG5cdGEge1xyXG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cdFx0Y29sb3I6IHZhcigtLWNvbG9ycy10ZXh0KTtcclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBjb21tb25TdHlsZSA9IGNzc2BcclxuXHQ6cm9vdCB7XHJcblx0XHQtLWNvbG9ycy1wcmltYXJ5OiByZ2IoNzYsIDIwOSwgNTUpO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDI6IHJnYigxMTMsIDEyOCwgMTQ3KTtcclxuXHRcdC0tY29sb3JzLWFuY2hvcjogcmdiKDAsIDE2OCwgMjU1KTtcclxuXHRcdC0tY29sb3JzLXNlY29uZGFyeS10ZXh0OiAjOWU5ZTllO1xyXG5cdFx0LS1jb2xvcnMtdGlwLWJhY2tncm91bmQ6ICM5MzkzOTM7XHJcblx0XHQtLWNvbG9ycy1hYm91dC1saW5rLWljb246ICNhOGE4YTg7XHJcblx0XHQtLWNvbG9ycy1wYXN0ZTogI2FjYmFjN2E4O1xyXG5cdFx0LS1jb2xvcnMtcGFzdGUtaG92ZXI6ICNhY2JhYzc7XHJcblx0fVxyXG5cclxuXHRodG1sIHtcclxuXHRcdG92ZXJmbG93LXk6IHNjcm9sbDtcclxuXHR9XHJcblxyXG5cdC8qIOyKpO2BrOuhpOuwlOydmCDtj60g64SI67mEICovXHJcblx0Ojotd2Via2l0LXNjcm9sbGJhciB7XHJcblx0XHR3aWR0aDogNXB4O1xyXG5cdFx0aGVpZ2h0OiA4cHg7XHJcblx0fVxyXG5cclxuXHQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuXHRcdGJhY2tncm91bmQ6ICM2NjY2NjY2YTsgLyog7Iqk7YGs66Gk67CUIOyDieyDgSAqL1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMTBweDsgLyog7Iqk7YGs66Gk67CUIOuRpeq3vCDthYzrkZDrpqwgKi9cclxuXHR9XHJcblxyXG5cdDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG5cdFx0YmFja2dyb3VuZDogI2RkZDsgLyrsiqTtgazroaTrsJQg65K3IOuwsOqyvSDsg4nsg4EqL1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGxpZ2h0U3RseWUgPSBjc3NgXHJcblx0Ym9keVtkYXRhLXRoZW1lPSdsaWdodCddIHtcclxuXHRcdC0tY29sb3JzLXRleHQ6IGJsYWNrO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDogd2hpdGU7XHJcblx0XHQtLWNvbG9ycy10YWItdGV4dDogIzZlNmQ3YTtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZDogIzBkMGMyMjtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZC1iYWNrZ3JvdW5kOiByZ2JhKDEzLCAxMiwgMzQsIDAuMDUpO1xyXG5cdFx0LS1jb2xvcnMtcG9zdC1jYXJkLWJvcmRlcjogcmdiYSgwLCAwLCAwLCAwLjEyKTtcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYm9yZGVyOiByZ2JhKDI1NSwgOTIsIDAsIDAuNyk7XHJcblx0XHQtLWNvbG9ycy1jb250ZW50LXRleHQ6ICMzNzM1MmY7XHJcblx0XHQtLWNvbG9ycy1hYm91dC1saW5rLWljb24taG92ZXI6IHJnYmEoMCwgMCwgMCwgMC4wNik7XHJcblx0XHQtLWNvbG9ycy1ibG9ja3F1b3RlLWJhY2tncm91bmQ6ICNmMmZmZWU3NTtcclxuXHRcdCR7cHJpc219XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgZGFya1N0eWxlID0gY3NzYFxyXG5cdGJvZHlbZGF0YS10aGVtZT0nZGFyayddIHtcclxuXHRcdC0tY29sb3JzLXRleHQ6IHdoaXRlO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDogYmxhY2s7XHJcblx0XHQtLWNvbG9ycy10YWItdGV4dDogIzc2ODM5MDtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZDogI2FjYmFjNztcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZC1iYWNrZ3JvdW5kOiAjMzczZTQ3O1xyXG5cdFx0LS1jb2xvcnMtcG9zdC1jYXJkLWJvcmRlcjogIzM2M2Y0NztcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYm9yZGVyOiAjZmY1YzAwO1xyXG5cdFx0LS1jb2xvcnMtY29udGVudC10ZXh0OiAjZTZlNmU2O1xyXG5cdFx0LS1jb2xvcnMtYWJvdXQtbGluay1pY29uLWhvdmVyOiByZ2JhKDIxMywgMjEzLCAyMTMsIDAuMjYpO1xyXG5cdFx0LS1jb2xvcnMtYmxvY2txdW90ZS1iYWNrZ3JvdW5kOiAjZmFmYmZjMmI7XHJcblx0XHQke2Rhcmt9XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgZGVmYXVsdFN0eWxlID0gY3NzYFxyXG5cdCR7cmVzZXRTdHlsZX07XHJcblx0JHtjb21tb25TdHlsZX07XHJcblx0JHtsaWdodFN0bHllfTtcclxuXHQke2RhcmtTdHlsZX07XHJcbmA7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$a
};
const lightStlye = /* @__PURE__ */ css("body[data-theme='light']{--colors-text:black;--colors-background:white;--colors-tab-text:#6e6d7a;--colors-tab-selected:#0d0c22;--colors-tab-selected-background:rgba(13, 12, 34, 0.05);--colors-post-card-border:rgba(0, 0, 0, 0.12);--colors-blockquote-border:rgba(255, 92, 0, 0.7);--colors-content-text:#37352f;--colors-about-link-icon-hover:rgba(0, 0, 0, 0.06);--colors-blockquote-background:#f2ffee75;", prism, ";}" + (process.env.NODE_ENV === "production" ? "" : ";label:lightStlye;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvZnNCIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdsb2JhbCwgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBHbG9iYWxTdHlsZTogRnVuY3Rpb25Db21wb25lbnQgPSAoKSA9PiB7XHJcblx0cmV0dXJuIDxHbG9iYWwgc3R5bGVzPXtkZWZhdWx0U3R5bGV9IC8+O1xyXG59O1xyXG5cclxuY29uc3QgcHJpc20gPSBjc3NgXHJcblx0Y29kZSxcclxuXHRjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10sXHJcblx0cHJlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xyXG5cdFx0Y29sb3I6ICMyNDI5MmU7XHJcblx0fVxyXG5cdHByZSB7XHJcblx0XHRjb2xvcjogIzI0MjkyZTtcclxuXHRcdGJhY2tncm91bmQ6ICNmNmY4ZmE7XHJcblx0fVxyXG5cdC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogIzAwNWNjNTtcclxuXHR9XHJcblx0LnRva2VuLmNvbW1lbnQsXHJcblx0LnRva2VuLnByb2xvZyxcclxuXHQudG9rZW4uZG9jdHlwZSxcclxuXHQudG9rZW4uY2RhdGEge1xyXG5cdFx0Y29sb3I6ICM5Njk4OTY7XHJcblx0fVxyXG5cdC50b2tlbi5wdW5jdHVhdGlvbiB7XHJcblx0XHRjb2xvcjogIzI0MjkyZTtcclxuXHR9XHJcblx0LnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzAzMmY2MjtcclxuXHR9XHJcblx0LnRva2VuLmF0cnVsZSxcclxuXHQudG9rZW4uYXR0ci12YWx1ZSB7XHJcblx0XHRjb2xvcjogIzE4MzY5MTtcclxuXHR9XHJcblx0LnRva2VuLnByb3BlcnR5LFxyXG5cdC50b2tlbi50YWcge1xyXG5cdFx0Y29sb3I6ICM2M2EzNWM7XHJcblx0fVxyXG5cdC50b2tlbi5ib29sZWFuLFxyXG5cdC50b2tlbi5udW1iZXIge1xyXG5cdFx0Y29sb3I6ICMwMDg2YjM7XHJcblx0fVxyXG5cdC50b2tlbi5zZWxlY3RvcixcclxuXHQudG9rZW4uYXR0ci1uYW1lLFxyXG5cdC50b2tlbi5hdHRyLXZhbHVlIC5wdW5jdHVhdGlvbjpmaXJzdC1vZi10eXBlLFxyXG5cdC50b2tlbi5rZXl3b3JkLFxyXG5cdC50b2tlbi5yZWdleCxcclxuXHQudG9rZW4uaW1wb3J0YW50IHtcclxuXHRcdGNvbG9yOiAjZDczYTQ5O1xyXG5cdH1cclxuXHQudG9rZW4ub3BlcmF0b3IsXHJcblx0LnRva2VuLmVudGl0eSxcclxuXHQudG9rZW4udXJsLFxyXG5cdC5sYW5ndWFnZS1jc3Mge1xyXG5cdFx0Y29sb3I6ICNkNzNhNDk7XHJcblx0fVxyXG5cdC50b2tlbi5lbnRpdHkge1xyXG5cdFx0Y3Vyc29yOiBoZWxwO1xyXG5cdH1cclxuXHQubmFtZXNwYWNlIHtcclxuXHRcdG9wYWNpdHk6IDAuNztcclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBkYXJrID0gY3NzYFxyXG5cdGNvZGVbY2xhc3MqPSdsYW5ndWFnZS0nXSxcclxuXHRwcmVbY2xhc3MqPSdsYW5ndWFnZS0nXSB7XHJcblx0XHRjb2xvcjogI2NjYztcclxuXHRcdGJhY2tncm91bmQ6IHJnYig0MCwgNDEsIDU0KTtcclxuXHR9XHJcblxyXG5cdHByZSB7XHJcblx0XHR0ZXh0LXNoYWRvdzogbm9uZTtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6ICM1YTVmODA7XHJcblx0fVxyXG5cclxuXHQvKiBJbmxpbmUgY29kZSAqL1xyXG5cclxuXHQ6bm90KHByZSkgPiBjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMC4zZW07XHJcblx0XHR3aGl0ZS1zcGFjZTogbm9ybWFsO1xyXG5cdH1cclxuXHJcblx0cHJlIHtcclxuXHRcdGNvbG9yOiAjY2NjO1xyXG5cdFx0YmFja2dyb3VuZDogcmdiKDQwLCA0MSwgNTQpO1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTMwMCB7XHJcblx0XHRoZWlnaHQ6IDMwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNDAwIHtcclxuXHRcdGhlaWdodDogNDAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC01MDAge1xyXG5cdFx0aGVpZ2h0OiA1MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTYwMCB7XHJcblx0XHRoZWlnaHQ6IDYwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNzAwIHtcclxuXHRcdGhlaWdodDogNzAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC04MDAge1xyXG5cdFx0aGVpZ2h0OiA4MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNvbW1lbnQge1xyXG5cdFx0Y29sb3I6IHJnYmEoOTgsIDExNCwgMTY0LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5wcm9sb2cge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjA3LCAyMDcsIDE5NCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4udGFnIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIyMCwgMTA0LCAxNzAsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmVudGl0eSB7XHJcblx0XHRjb2xvcjogcmdiYSgxMzksIDIzMywgMjUzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5hdHJ1bGUge1xyXG5cdFx0Y29sb3I6IHJnYmEoOTgsIDIzOSwgMTE3LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi51cmwge1xyXG5cdFx0Y29sb3I6IHJnYmEoMTAyLCAyMTcsIDIzOSwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uc2VsZWN0b3Ige1xyXG5cdFx0Y29sb3I6IHJnYmEoMjA3LCAyMDcsIDE5NCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI0MSwgMjUwLCAxNDAsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnByb3BlcnR5IHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmltcG9ydGFudCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEyMSwgMTk4LCAxKTtcclxuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnB1bmN0dWF0aW9uIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIzMCwgMjE5LCAxMTYsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLm51bWJlciB7XHJcblx0XHRjb2xvcjogcmdiYSgxODksIDE0NywgMjQ5LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ua2V5d29yZCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEyMSwgMTk4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5ib29sZWFuIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLm9wZXJhdG9yIHtcclxuXHRcdGNvbG9yOiByZ2JhKDEzOSwgMjMzLCAyNTMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNoYXIge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxMzUsIDE1NywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ucmVnZXgge1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi52YXJpYWJsZSB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmNvbnN0YW50IHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnN5bWJvbCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5idWlsdGluIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTIxLCAxOTgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmF0dHItdmFsdWUge1xyXG5cdFx0Y29sb3I6ICM3ZWM2OTk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uZGVsZXRlZCB7XHJcblx0XHRjb2xvcjogI2UyNzc3YTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5uYW1lc3BhY2Uge1xyXG5cdFx0Y29sb3I6ICNlMjc3N2E7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYm9sZCB7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5pdGFsaWMge1xyXG5cdFx0Zm9udC1zdHlsZTogaXRhbGljO1xyXG5cdH1cclxuXHJcblx0LnRva2VuIHtcclxuXHRcdGNvbG9yOiAjZmY3OWM2O1xyXG5cdH1cclxuXHJcblx0LmxhbmdhZ3VlLWNwcCAudG9rZW4uc3RyaW5nIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0LmxhbmdhZ3VlLWMgLnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1jc3MgLnRva2VuLnNlbGVjdG9yIHtcclxuXHRcdGNvbG9yOiByZ2JhKDgwLCAyNTAsIDEyMywgMSk7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtY3NzIC50b2tlbi5wcm9wZXJ0eSB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1qYXZhIHNwYW4udG9rZW4uY2xhc3MtbmFtZSB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1qYXZhIC50b2tlbi5jbGFzcy1uYW1lIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW1hcmt1cCAudG9rZW4uYXR0ci12YWx1ZSB7XHJcblx0XHRjb2xvcjogcmdiYSgxMDIsIDIxNywgMjM5LCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1tYXJrdXAgLnRva2VuLnRhZyB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW9iamVjdGl2ZWMgLnRva2VuLnByb3BlcnR5IHtcclxuXHRcdGNvbG9yOiAjNjZkOWVmO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLW9iamVjdGl2ZWMgLnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzUwZmE3YjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1waHAgLnRva2VuLmJvb2xlYW4ge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcGhwIC50b2tlbi5mdW5jdGlvbiB7XHJcblx0XHRjb2xvcjogI2ZmNzljNjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1waHAgLnRva2VuLmtleXdvcmQge1xyXG5cdFx0Y29sb3I6ICM2NmQ5ZWY7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcnVieSAudG9rZW4uc3ltYm9sIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLXJ1YnkgLnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6ICNjZmNmYzI7XHJcblx0fVxyXG5cclxuXHRwcmUubGluZS1udW1iZXJzIHtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdHBhZGRpbmctbGVmdDogMy44ZW07XHJcblx0XHRjb3VudGVyLXJlc2V0OiBsaW5lbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0cHJlLmxpbmUtbnVtYmVycyA+IGNvZGUge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0d2hpdGUtc3BhY2U6IGluaGVyaXQ7XHJcblx0fVxyXG5cclxuXHQubGluZS1udW1iZXJzIC5saW5lLW51bWJlcnMtcm93cyB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZTtcclxuXHRcdHRvcDogMDtcclxuXHRcdGZvbnQtc2l6ZTogMTAwJTtcclxuXHRcdGxlZnQ6IC0zLjhlbTtcclxuXHRcdHdpZHRoOiAzZW07XHJcblx0XHQvKiB3b3JrcyBmb3IgbGluZS1udW1iZXJzIGJlbG93IDEwMDAgbGluZXMgKi9cclxuXHRcdGxldHRlci1zcGFjaW5nOiAtMXB4O1xyXG5cdFx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzk5OTtcclxuXHRcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0dXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0fVxyXG5cclxuXHQubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuIHtcclxuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG5cdFx0ZGlzcGxheTogYmxvY2s7XHJcblx0XHRjb3VudGVyLWluY3JlbWVudDogbGluZW51bWJlcjtcclxuXHR9XHJcblxyXG5cdC5saW5lLW51bWJlcnMtcm93cyA+IHNwYW46YmVmb3JlIHtcclxuXHRcdGNvbnRlbnQ6IGNvdW50ZXIobGluZW51bWJlcik7XHJcblx0XHRjb2xvcjogIzk5OTtcclxuXHRcdGRpc3BsYXk6IGJsb2NrO1xyXG5cdFx0cGFkZGluZy1yaWdodDogMC44ZW07XHJcblx0XHR0ZXh0LWFsaWduOiByaWdodDtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIHtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogMC4zZW07XHJcblx0XHRyaWdodDogMC4yZW07XHJcblx0XHR0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXQ7XHJcblx0XHRvcGFjaXR5OiAwO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhcjpob3ZlciA+IC50b29sYmFyIHtcclxuXHRcdG9wYWNpdHk6IDE7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgLnRvb2xiYXItaXRlbSB7XHJcblx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcblx0XHRwYWRkaW5nLXJpZ2h0OiAyMHB4O1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGEge1xyXG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbiB7XHJcblx0XHRiYWNrZ3JvdW5kOiBub25lO1xyXG5cdFx0Ym9yZGVyOiAwO1xyXG5cdFx0Y29sb3I6IGluaGVyaXQ7XHJcblx0XHRmb250OiBpbmhlcml0O1xyXG5cdFx0bGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuXHRcdG92ZXJmbG93OiB2aXNpYmxlO1xyXG5cdFx0cGFkZGluZzogMDtcclxuXHRcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcblx0XHQvKiBmb3IgYnV0dG9uICovXHJcblx0XHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGEsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgc3BhbiB7XHJcblx0XHRjb2xvcjogI2NjYztcclxuXHRcdGZvbnQtc2l6ZTogMC44ZW07XHJcblx0XHRwYWRkaW5nOiAwLjVlbTtcclxuXHRcdGJhY2tncm91bmQ6IHJnYmEoOTgsIDExNCwgMTY0LCAxKTtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGE6aG92ZXIsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGE6Zm9jdXMsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbjpob3ZlcixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgYnV0dG9uOmZvY3VzLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBzcGFuOmhvdmVyLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBzcGFuOmZvY3VzIHtcclxuXHRcdGNvbG9yOiBpbmhlcml0O1xyXG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdmVyZGUpO1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IHJlc2V0U3R5bGUgPSBjc3NgXHJcblx0LyohIG1pbmlyZXNldC5jc3MgdjAuMC42IHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL2pndGhtcy9taW5pcmVzZXQuY3NzICovXHJcblx0YmxvY2txdW90ZSxcclxuXHRib2R5LFxyXG5cdGRkLFxyXG5cdGRsLFxyXG5cdGR0LFxyXG5cdGZpZWxkc2V0LFxyXG5cdGZpZ3VyZSxcclxuXHRoMSxcclxuXHRoMixcclxuXHRoMyxcclxuXHRoNCxcclxuXHRoNSxcclxuXHRoNixcclxuXHRocixcclxuXHRodG1sLFxyXG5cdGlmcmFtZSxcclxuXHRsZWdlbmQsXHJcblx0bGksXHJcblx0b2wsXHJcblx0cCxcclxuXHRwcmUsXHJcblx0dGV4dGFyZWEsXHJcblx0dWwge1xyXG5cdFx0bWFyZ2luOiAwO1xyXG5cdFx0cGFkZGluZzogMDtcclxuXHR9XHJcblx0aDEsXHJcblx0aDIsXHJcblx0aDMsXHJcblx0aDQsXHJcblx0aDUsXHJcblx0aDYge1xyXG5cdFx0Zm9udC1zaXplOiAxMDAlO1xyXG5cdFx0Zm9udC13ZWlnaHQ6IDQwMDtcclxuXHR9XHJcblx0dWwge1xyXG5cdFx0bGlzdC1zdHlsZTogbm9uZTtcclxuXHR9XHJcblx0YnV0dG9uLFxyXG5cdGlucHV0LFxyXG5cdHNlbGVjdCB7XHJcblx0XHRtYXJnaW46IDA7XHJcblx0fVxyXG5cdGh0bWwge1xyXG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuXHR9XHJcblx0KixcclxuXHQ6YWZ0ZXIsXHJcblx0OmJlZm9yZSB7XHJcblx0XHRib3gtc2l6aW5nOiBpbmhlcml0O1xyXG5cdH1cclxuXHRpbWcsXHJcblx0dmlkZW8ge1xyXG5cdFx0aGVpZ2h0OiBhdXRvO1xyXG5cdFx0bWF4LXdpZHRoOiAxMDAlO1xyXG5cdH1cclxuXHRpZnJhbWUge1xyXG5cdFx0Ym9yZGVyOiAwO1xyXG5cdH1cclxuXHR0YWJsZSB7XHJcblx0XHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG5cdFx0Ym9yZGVyLXNwYWNpbmc6IDA7XHJcblx0fVxyXG5cdHRkLFxyXG5cdHRoIHtcclxuXHRcdHBhZGRpbmc6IDA7XHJcblx0fVxyXG5cdGEge1xyXG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cdFx0Y29sb3I6IHZhcigtLWNvbG9ycy10ZXh0KTtcclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBjb21tb25TdHlsZSA9IGNzc2BcclxuXHQ6cm9vdCB7XHJcblx0XHQtLWNvbG9ycy1wcmltYXJ5OiByZ2IoNzYsIDIwOSwgNTUpO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDI6IHJnYigxMTMsIDEyOCwgMTQ3KTtcclxuXHRcdC0tY29sb3JzLWFuY2hvcjogcmdiKDAsIDE2OCwgMjU1KTtcclxuXHRcdC0tY29sb3JzLXNlY29uZGFyeS10ZXh0OiAjOWU5ZTllO1xyXG5cdFx0LS1jb2xvcnMtdGlwLWJhY2tncm91bmQ6ICM5MzkzOTM7XHJcblx0XHQtLWNvbG9ycy1hYm91dC1saW5rLWljb246ICNhOGE4YTg7XHJcblx0XHQtLWNvbG9ycy1wYXN0ZTogI2FjYmFjN2E4O1xyXG5cdFx0LS1jb2xvcnMtcGFzdGUtaG92ZXI6ICNhY2JhYzc7XHJcblx0fVxyXG5cclxuXHRodG1sIHtcclxuXHRcdG92ZXJmbG93LXk6IHNjcm9sbDtcclxuXHR9XHJcblxyXG5cdC8qIOyKpO2BrOuhpOuwlOydmCDtj60g64SI67mEICovXHJcblx0Ojotd2Via2l0LXNjcm9sbGJhciB7XHJcblx0XHR3aWR0aDogNXB4O1xyXG5cdFx0aGVpZ2h0OiA4cHg7XHJcblx0fVxyXG5cclxuXHQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuXHRcdGJhY2tncm91bmQ6ICM2NjY2NjY2YTsgLyog7Iqk7YGs66Gk67CUIOyDieyDgSAqL1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMTBweDsgLyog7Iqk7YGs66Gk67CUIOuRpeq3vCDthYzrkZDrpqwgKi9cclxuXHR9XHJcblxyXG5cdDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG5cdFx0YmFja2dyb3VuZDogI2RkZDsgLyrsiqTtgazroaTrsJQg65K3IOuwsOqyvSDsg4nsg4EqL1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGxpZ2h0U3RseWUgPSBjc3NgXHJcblx0Ym9keVtkYXRhLXRoZW1lPSdsaWdodCddIHtcclxuXHRcdC0tY29sb3JzLXRleHQ6IGJsYWNrO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDogd2hpdGU7XHJcblx0XHQtLWNvbG9ycy10YWItdGV4dDogIzZlNmQ3YTtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZDogIzBkMGMyMjtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZC1iYWNrZ3JvdW5kOiByZ2JhKDEzLCAxMiwgMzQsIDAuMDUpO1xyXG5cdFx0LS1jb2xvcnMtcG9zdC1jYXJkLWJvcmRlcjogcmdiYSgwLCAwLCAwLCAwLjEyKTtcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYm9yZGVyOiByZ2JhKDI1NSwgOTIsIDAsIDAuNyk7XHJcblx0XHQtLWNvbG9ycy1jb250ZW50LXRleHQ6ICMzNzM1MmY7XHJcblx0XHQtLWNvbG9ycy1hYm91dC1saW5rLWljb24taG92ZXI6IHJnYmEoMCwgMCwgMCwgMC4wNik7XHJcblx0XHQtLWNvbG9ycy1ibG9ja3F1b3RlLWJhY2tncm91bmQ6ICNmMmZmZWU3NTtcclxuXHRcdCR7cHJpc219XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgZGFya1N0eWxlID0gY3NzYFxyXG5cdGJvZHlbZGF0YS10aGVtZT0nZGFyayddIHtcclxuXHRcdC0tY29sb3JzLXRleHQ6IHdoaXRlO1xyXG5cdFx0LS1jb2xvcnMtYmFja2dyb3VuZDogYmxhY2s7XHJcblx0XHQtLWNvbG9ycy10YWItdGV4dDogIzc2ODM5MDtcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZDogI2FjYmFjNztcclxuXHRcdC0tY29sb3JzLXRhYi1zZWxlY3RlZC1iYWNrZ3JvdW5kOiAjMzczZTQ3O1xyXG5cdFx0LS1jb2xvcnMtcG9zdC1jYXJkLWJvcmRlcjogIzM2M2Y0NztcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYm9yZGVyOiAjZmY1YzAwO1xyXG5cdFx0LS1jb2xvcnMtY29udGVudC10ZXh0OiAjZTZlNmU2O1xyXG5cdFx0LS1jb2xvcnMtYWJvdXQtbGluay1pY29uLWhvdmVyOiByZ2JhKDIxMywgMjEzLCAyMTMsIDAuMjYpO1xyXG5cdFx0LS1jb2xvcnMtYmxvY2txdW90ZS1iYWNrZ3JvdW5kOiAjZmFmYmZjMmI7XHJcblx0XHQke2Rhcmt9XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgZGVmYXVsdFN0eWxlID0gY3NzYFxyXG5cdCR7cmVzZXRTdHlsZX07XHJcblx0JHtjb21tb25TdHlsZX07XHJcblx0JHtsaWdodFN0bHllfTtcclxuXHQke2RhcmtTdHlsZX07XHJcbmA7XHJcbiJdfQ== */");
const darkStyle = /* @__PURE__ */ css("body[data-theme='dark']{--colors-text:white;--colors-background:black;--colors-tab-text:#768390;--colors-tab-selected:#acbac7;--colors-tab-selected-background:#373e47;--colors-post-card-border:#363f47;--colors-blockquote-border:#ff5c00;--colors-content-text:#e6e6e6;--colors-about-link-icon-hover:rgba(213, 213, 213, 0.26);--colors-blockquote-background:#fafbfc2b;", dark, ";}" + (process.env.NODE_ENV === "production" ? "" : ";label:darkStyle;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvZ0JxQiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL2NvbW1vbi9HbG9iYWxTdHlsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHbG9iYWwsIGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY29uc3QgR2xvYmFsU3R5bGU6IEZ1bmN0aW9uQ29tcG9uZW50ID0gKCkgPT4ge1xyXG5cdHJldHVybiA8R2xvYmFsIHN0eWxlcz17ZGVmYXVsdFN0eWxlfSAvPjtcclxufTtcclxuXHJcbmNvbnN0IHByaXNtID0gY3NzYFxyXG5cdGNvZGUsXHJcblx0Y29kZVtjbGFzcyo9J2xhbmd1YWdlLSddLFxyXG5cdHByZVtjbGFzcyo9J2xhbmd1YWdlLSddIHtcclxuXHRcdGNvbG9yOiAjMjQyOTJlO1xyXG5cdH1cclxuXHRwcmUge1xyXG5cdFx0Y29sb3I6ICMyNDI5MmU7XHJcblx0XHRiYWNrZ3JvdW5kOiAjZjZmOGZhO1xyXG5cdH1cclxuXHQudG9rZW4uZnVuY3Rpb24ge1xyXG5cdFx0Y29sb3I6ICMwMDVjYzU7XHJcblx0fVxyXG5cdC50b2tlbi5jb21tZW50LFxyXG5cdC50b2tlbi5wcm9sb2csXHJcblx0LnRva2VuLmRvY3R5cGUsXHJcblx0LnRva2VuLmNkYXRhIHtcclxuXHRcdGNvbG9yOiAjOTY5ODk2O1xyXG5cdH1cclxuXHQudG9rZW4ucHVuY3R1YXRpb24ge1xyXG5cdFx0Y29sb3I6ICMyNDI5MmU7XHJcblx0fVxyXG5cdC50b2tlbi5zdHJpbmcge1xyXG5cdFx0Y29sb3I6ICMwMzJmNjI7XHJcblx0fVxyXG5cdC50b2tlbi5hdHJ1bGUsXHJcblx0LnRva2VuLmF0dHItdmFsdWUge1xyXG5cdFx0Y29sb3I6ICMxODM2OTE7XHJcblx0fVxyXG5cdC50b2tlbi5wcm9wZXJ0eSxcclxuXHQudG9rZW4udGFnIHtcclxuXHRcdGNvbG9yOiAjNjNhMzVjO1xyXG5cdH1cclxuXHQudG9rZW4uYm9vbGVhbixcclxuXHQudG9rZW4ubnVtYmVyIHtcclxuXHRcdGNvbG9yOiAjMDA4NmIzO1xyXG5cdH1cclxuXHQudG9rZW4uc2VsZWN0b3IsXHJcblx0LnRva2VuLmF0dHItbmFtZSxcclxuXHQudG9rZW4uYXR0ci12YWx1ZSAucHVuY3R1YXRpb246Zmlyc3Qtb2YtdHlwZSxcclxuXHQudG9rZW4ua2V5d29yZCxcclxuXHQudG9rZW4ucmVnZXgsXHJcblx0LnRva2VuLmltcG9ydGFudCB7XHJcblx0XHRjb2xvcjogI2Q3M2E0OTtcclxuXHR9XHJcblx0LnRva2VuLm9wZXJhdG9yLFxyXG5cdC50b2tlbi5lbnRpdHksXHJcblx0LnRva2VuLnVybCxcclxuXHQubGFuZ3VhZ2UtY3NzIHtcclxuXHRcdGNvbG9yOiAjZDczYTQ5O1xyXG5cdH1cclxuXHQudG9rZW4uZW50aXR5IHtcclxuXHRcdGN1cnNvcjogaGVscDtcclxuXHR9XHJcblx0Lm5hbWVzcGFjZSB7XHJcblx0XHRvcGFjaXR5OiAwLjc7XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgZGFyayA9IGNzc2BcclxuXHRjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10sXHJcblx0cHJlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xyXG5cdFx0Y29sb3I6ICNjY2M7XHJcblx0XHRiYWNrZ3JvdW5kOiByZ2IoNDAsIDQxLCA1NCk7XHJcblx0fVxyXG5cclxuXHRwcmUge1xyXG5cdFx0dGV4dC1zaGFkb3c6IG5vbmU7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjNWE1ZjgwO1xyXG5cdH1cclxuXHJcblx0LyogSW5saW5lIGNvZGUgKi9cclxuXHJcblx0Om5vdChwcmUpID4gY29kZVtjbGFzcyo9J2xhbmd1YWdlLSddIHtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDAuM2VtO1xyXG5cdFx0d2hpdGUtc3BhY2U6IG5vcm1hbDtcclxuXHR9XHJcblxyXG5cdHByZSB7XHJcblx0XHRjb2xvcjogI2NjYztcclxuXHRcdGJhY2tncm91bmQ6IHJnYig0MCwgNDEsIDU0KTtcclxuXHR9XHJcblxyXG5cdC5saW1pdC0zMDAge1xyXG5cdFx0aGVpZ2h0OiAzMDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTQwMCB7XHJcblx0XHRoZWlnaHQ6IDQwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNTAwIHtcclxuXHRcdGhlaWdodDogNTAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC02MDAge1xyXG5cdFx0aGVpZ2h0OiA2MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTcwMCB7XHJcblx0XHRoZWlnaHQ6IDcwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtODAwIHtcclxuXHRcdGhlaWdodDogODAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5jb21tZW50IHtcclxuXHRcdGNvbG9yOiByZ2JhKDk4LCAxMTQsIDE2NCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ucHJvbG9nIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIwNywgMjA3LCAxOTQsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnRhZyB7XHJcblx0XHRjb2xvcjogcmdiYSgyMjAsIDEwNCwgMTcwLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5lbnRpdHkge1xyXG5cdFx0Y29sb3I6IHJnYmEoMTM5LCAyMzMsIDI1MywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYXRydWxlIHtcclxuXHRcdGNvbG9yOiByZ2JhKDk4LCAyMzksIDExNywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4udXJsIHtcclxuXHRcdGNvbG9yOiByZ2JhKDEwMiwgMjE3LCAyMzksIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnNlbGVjdG9yIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIwNywgMjA3LCAxOTQsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogcmdiYSgyNDEsIDI1MCwgMTQwLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5wcm9wZXJ0eSB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5pbXBvcnRhbnQge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxMjEsIDE5OCwgMSk7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5wdW5jdHVhdGlvbiB7XHJcblx0XHRjb2xvcjogcmdiYSgyMzAsIDIxOSwgMTE2LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5udW1iZXIge1xyXG5cdFx0Y29sb3I6IHJnYmEoMTg5LCAxNDcsIDI0OSwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uZnVuY3Rpb24ge1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5jbGFzcy1uYW1lIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmtleXdvcmQge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxMjEsIDE5OCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYm9vbGVhbiB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5vcGVyYXRvciB7XHJcblx0XHRjb2xvcjogcmdiYSgxMzksIDIzMywgMjUzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5jaGFyIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTM1LCAxNTcsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnJlZ2V4IHtcclxuXHRcdGNvbG9yOiByZ2JhKDgwLCAyNTAsIDEyMywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4udmFyaWFibGUge1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5jb25zdGFudCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5zeW1ib2wge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYnVpbHRpbiB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEyMSwgMTk4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5hdHRyLXZhbHVlIHtcclxuXHRcdGNvbG9yOiAjN2VjNjk5O1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmRlbGV0ZWQge1xyXG5cdFx0Y29sb3I6ICNlMjc3N2E7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ubmFtZXNwYWNlIHtcclxuXHRcdGNvbG9yOiAjZTI3NzdhO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmJvbGQge1xyXG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uaXRhbGljIHtcclxuXHRcdGZvbnQtc3R5bGU6IGl0YWxpYztcclxuXHR9XHJcblxyXG5cdC50b2tlbiB7XHJcblx0XHRjb2xvcjogI2ZmNzljNjtcclxuXHR9XHJcblxyXG5cdC5sYW5nYWd1ZS1jcHAgLnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5nYWd1ZS1jIC50b2tlbi5zdHJpbmcge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtY3NzIC50b2tlbi5zZWxlY3RvciB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLWNzcyAudG9rZW4ucHJvcGVydHkge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtamF2YSBzcGFuLnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtamF2YSAudG9rZW4uY2xhc3MtbmFtZSB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1tYXJrdXAgLnRva2VuLmF0dHItdmFsdWUge1xyXG5cdFx0Y29sb3I6IHJnYmEoMTAyLCAyMTcsIDIzOSwgMSk7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtbWFya3VwIC50b2tlbi50YWcge1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1vYmplY3RpdmVjIC50b2tlbi5wcm9wZXJ0eSB7XHJcblx0XHRjb2xvcjogIzY2ZDllZjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1vYmplY3RpdmVjIC50b2tlbi5zdHJpbmcge1xyXG5cdFx0Y29sb3I6ICM1MGZhN2I7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcGhwIC50b2tlbi5ib29sZWFuIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLXBocCAudG9rZW4uZnVuY3Rpb24ge1xyXG5cdFx0Y29sb3I6ICNmZjc5YzY7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcGhwIC50b2tlbi5rZXl3b3JkIHtcclxuXHRcdGNvbG9yOiAjNjZkOWVmO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLXJ1YnkgLnRva2VuLnN5bWJvbCB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1ydWJ5IC50b2tlbi5jbGFzcy1uYW1lIHtcclxuXHRcdGNvbG9yOiAjY2ZjZmMyO1xyXG5cdH1cclxuXHJcblx0cHJlLmxpbmUtbnVtYmVycyB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRwYWRkaW5nLWxlZnQ6IDMuOGVtO1xyXG5cdFx0Y291bnRlci1yZXNldDogbGluZW51bWJlcjtcclxuXHR9XHJcblxyXG5cdHByZS5saW5lLW51bWJlcnMgPiBjb2RlIHtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdHdoaXRlLXNwYWNlOiBpbmhlcml0O1xyXG5cdH1cclxuXHJcblx0LmxpbmUtbnVtYmVycyAubGluZS1udW1iZXJzLXJvd3Mge1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XHJcblx0XHR0b3A6IDA7XHJcblx0XHRmb250LXNpemU6IDEwMCU7XHJcblx0XHRsZWZ0OiAtMy44ZW07XHJcblx0XHR3aWR0aDogM2VtO1xyXG5cdFx0Lyogd29ya3MgZm9yIGxpbmUtbnVtYmVycyBiZWxvdyAxMDAwIGxpbmVzICovXHJcblx0XHRsZXR0ZXItc3BhY2luZzogLTFweDtcclxuXHRcdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM5OTk7XHJcblx0XHQtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcclxuXHRcdC1tcy11c2VyLXNlbGVjdDogbm9uZTtcclxuXHRcdHVzZXItc2VsZWN0OiBub25lO1xyXG5cdH1cclxuXHJcblx0LmxpbmUtbnVtYmVycy1yb3dzID4gc3BhbiB7XHJcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZTtcclxuXHRcdGRpc3BsYXk6IGJsb2NrO1xyXG5cdFx0Y291bnRlci1pbmNyZW1lbnQ6IGxpbmVudW1iZXI7XHJcblx0fVxyXG5cclxuXHQubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuOmJlZm9yZSB7XHJcblx0XHRjb250ZW50OiBjb3VudGVyKGxpbmVudW1iZXIpO1xyXG5cdFx0Y29sb3I6ICM5OTk7XHJcblx0XHRkaXNwbGF5OiBibG9jaztcclxuXHRcdHBhZGRpbmctcmlnaHQ6IDAuOGVtO1xyXG5cdFx0dGV4dC1hbGlnbjogcmlnaHQ7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyIHtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR0b3A6IDAuM2VtO1xyXG5cdFx0cmlnaHQ6IDAuMmVtO1xyXG5cdFx0dHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2UtaW4tb3V0O1xyXG5cdFx0b3BhY2l0eTogMDtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXI6aG92ZXIgPiAudG9vbGJhciB7XHJcblx0XHRvcGFjaXR5OiAxO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIC50b29sYmFyLWl0ZW0ge1xyXG5cdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG5cdFx0cGFkZGluZy1yaWdodDogMjBweDtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBhIHtcclxuXHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBidXR0b24ge1xyXG5cdFx0YmFja2dyb3VuZDogbm9uZTtcclxuXHRcdGJvcmRlcjogMDtcclxuXHRcdGNvbG9yOiBpbmhlcml0O1xyXG5cdFx0Zm9udDogaW5oZXJpdDtcclxuXHRcdGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcblx0XHRvdmVyZmxvdzogdmlzaWJsZTtcclxuXHRcdHBhZGRpbmc6IDA7XHJcblx0XHQtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LyogZm9yIGJ1dHRvbiAqL1xyXG5cdFx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcclxuXHRcdC1tcy11c2VyLXNlbGVjdDogbm9uZTtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBhLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBidXR0b24sXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIHNwYW4ge1xyXG5cdFx0Y29sb3I6ICNjY2M7XHJcblx0XHRmb250LXNpemU6IDAuOGVtO1xyXG5cdFx0cGFkZGluZzogMC41ZW07XHJcblx0XHRiYWNrZ3JvdW5kOiByZ2JhKDk4LCAxMTQsIDE2NCwgMSk7XHJcblx0XHRib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBhOmhvdmVyLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBhOmZvY3VzLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBidXR0b246aG92ZXIsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbjpmb2N1cyxcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgc3Bhbjpob3ZlcixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgc3Bhbjpmb2N1cyB7XHJcblx0XHRjb2xvcjogaW5oZXJpdDtcclxuXHRcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLXZlcmRlKTtcclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCByZXNldFN0eWxlID0gY3NzYFxyXG5cdC8qISBtaW5pcmVzZXQuY3NzIHYwLjAuNiB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9qZ3RobXMvbWluaXJlc2V0LmNzcyAqL1xyXG5cdGJsb2NrcXVvdGUsXHJcblx0Ym9keSxcclxuXHRkZCxcclxuXHRkbCxcclxuXHRkdCxcclxuXHRmaWVsZHNldCxcclxuXHRmaWd1cmUsXHJcblx0aDEsXHJcblx0aDIsXHJcblx0aDMsXHJcblx0aDQsXHJcblx0aDUsXHJcblx0aDYsXHJcblx0aHIsXHJcblx0aHRtbCxcclxuXHRpZnJhbWUsXHJcblx0bGVnZW5kLFxyXG5cdGxpLFxyXG5cdG9sLFxyXG5cdHAsXHJcblx0cHJlLFxyXG5cdHRleHRhcmVhLFxyXG5cdHVsIHtcclxuXHRcdG1hcmdpbjogMDtcclxuXHRcdHBhZGRpbmc6IDA7XHJcblx0fVxyXG5cdGgxLFxyXG5cdGgyLFxyXG5cdGgzLFxyXG5cdGg0LFxyXG5cdGg1LFxyXG5cdGg2IHtcclxuXHRcdGZvbnQtc2l6ZTogMTAwJTtcclxuXHRcdGZvbnQtd2VpZ2h0OiA0MDA7XHJcblx0fVxyXG5cdHVsIHtcclxuXHRcdGxpc3Qtc3R5bGU6IG5vbmU7XHJcblx0fVxyXG5cdGJ1dHRvbixcclxuXHRpbnB1dCxcclxuXHRzZWxlY3Qge1xyXG5cdFx0bWFyZ2luOiAwO1xyXG5cdH1cclxuXHRodG1sIHtcclxuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0fVxyXG5cdCosXHJcblx0OmFmdGVyLFxyXG5cdDpiZWZvcmUge1xyXG5cdFx0Ym94LXNpemluZzogaW5oZXJpdDtcclxuXHR9XHJcblx0aW1nLFxyXG5cdHZpZGVvIHtcclxuXHRcdGhlaWdodDogYXV0bztcclxuXHRcdG1heC13aWR0aDogMTAwJTtcclxuXHR9XHJcblx0aWZyYW1lIHtcclxuXHRcdGJvcmRlcjogMDtcclxuXHR9XHJcblx0dGFibGUge1xyXG5cdFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuXHRcdGJvcmRlci1zcGFjaW5nOiAwO1xyXG5cdH1cclxuXHR0ZCxcclxuXHR0aCB7XHJcblx0XHRwYWRkaW5nOiAwO1xyXG5cdH1cclxuXHRhIHtcclxuXHRcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuXHRcdGNvbG9yOiB2YXIoLS1jb2xvcnMtdGV4dCk7XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgY29tbW9uU3R5bGUgPSBjc3NgXHJcblx0OnJvb3Qge1xyXG5cdFx0LS1jb2xvcnMtcHJpbWFyeTogcmdiKDc2LCAyMDksIDU1KTtcclxuXHRcdC0tY29sb3JzLWJhY2tncm91bmQyOiByZ2IoMTEzLCAxMjgsIDE0Nyk7XHJcblx0XHQtLWNvbG9ycy1hbmNob3I6IHJnYigwLCAxNjgsIDI1NSk7XHJcblx0XHQtLWNvbG9ycy1zZWNvbmRhcnktdGV4dDogIzllOWU5ZTtcclxuXHRcdC0tY29sb3JzLXRpcC1iYWNrZ3JvdW5kOiAjOTM5MzkzO1xyXG5cdFx0LS1jb2xvcnMtYWJvdXQtbGluay1pY29uOiAjYThhOGE4O1xyXG5cdFx0LS1jb2xvcnMtcGFzdGU6ICNhY2JhYzdhODtcclxuXHRcdC0tY29sb3JzLXBhc3RlLWhvdmVyOiAjYWNiYWM3O1xyXG5cdH1cclxuXHJcblx0aHRtbCB7XHJcblx0XHRvdmVyZmxvdy15OiBzY3JvbGw7XHJcblx0fVxyXG5cclxuXHQvKiDsiqTtgazroaTrsJTsnZgg7Y+tIOuEiOu5hCAqL1xyXG5cdDo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG5cdFx0d2lkdGg6IDVweDtcclxuXHRcdGhlaWdodDogOHB4O1xyXG5cdH1cclxuXHJcblx0Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcblx0XHRiYWNrZ3JvdW5kOiAjNjY2NjY2NmE7IC8qIOyKpO2BrOuhpOuwlCDsg4nsg4EgKi9cclxuXHRcdGJvcmRlci1yYWRpdXM6IDEwcHg7IC8qIOyKpO2BrOuhpOuwlCDrkaXqt7wg7YWM65GQ66asICovXHJcblx0fVxyXG5cclxuXHQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuXHRcdGJhY2tncm91bmQ6ICNkZGQ7IC8q7Iqk7YGs66Gk67CUIOuStyDrsLDqsr0g7IOJ7IOBKi9cclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBsaWdodFN0bHllID0gY3NzYFxyXG5cdGJvZHlbZGF0YS10aGVtZT0nbGlnaHQnXSB7XHJcblx0XHQtLWNvbG9ycy10ZXh0OiBibGFjaztcclxuXHRcdC0tY29sb3JzLWJhY2tncm91bmQ6IHdoaXRlO1xyXG5cdFx0LS1jb2xvcnMtdGFiLXRleHQ6ICM2ZTZkN2E7XHJcblx0XHQtLWNvbG9ycy10YWItc2VsZWN0ZWQ6ICMwZDBjMjI7XHJcblx0XHQtLWNvbG9ycy10YWItc2VsZWN0ZWQtYmFja2dyb3VuZDogcmdiYSgxMywgMTIsIDM0LCAwLjA1KTtcclxuXHRcdC0tY29sb3JzLXBvc3QtY2FyZC1ib3JkZXI6IHJnYmEoMCwgMCwgMCwgMC4xMik7XHJcblx0XHQtLWNvbG9ycy1ibG9ja3F1b3RlLWJvcmRlcjogcmdiYSgyNTUsIDkyLCAwLCAwLjcpO1xyXG5cdFx0LS1jb2xvcnMtY29udGVudC10ZXh0OiAjMzczNTJmO1xyXG5cdFx0LS1jb2xvcnMtYWJvdXQtbGluay1pY29uLWhvdmVyOiByZ2JhKDAsIDAsIDAsIDAuMDYpO1xyXG5cdFx0LS1jb2xvcnMtYmxvY2txdW90ZS1iYWNrZ3JvdW5kOiAjZjJmZmVlNzU7XHJcblx0XHQke3ByaXNtfVxyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGRhcmtTdHlsZSA9IGNzc2BcclxuXHRib2R5W2RhdGEtdGhlbWU9J2RhcmsnXSB7XHJcblx0XHQtLWNvbG9ycy10ZXh0OiB3aGl0ZTtcclxuXHRcdC0tY29sb3JzLWJhY2tncm91bmQ6IGJsYWNrO1xyXG5cdFx0LS1jb2xvcnMtdGFiLXRleHQ6ICM3NjgzOTA7XHJcblx0XHQtLWNvbG9ycy10YWItc2VsZWN0ZWQ6ICNhY2JhYzc7XHJcblx0XHQtLWNvbG9ycy10YWItc2VsZWN0ZWQtYmFja2dyb3VuZDogIzM3M2U0NztcclxuXHRcdC0tY29sb3JzLXBvc3QtY2FyZC1ib3JkZXI6ICMzNjNmNDc7XHJcblx0XHQtLWNvbG9ycy1ibG9ja3F1b3RlLWJvcmRlcjogI2ZmNWMwMDtcclxuXHRcdC0tY29sb3JzLWNvbnRlbnQtdGV4dDogI2U2ZTZlNjtcclxuXHRcdC0tY29sb3JzLWFib3V0LWxpbmstaWNvbi1ob3ZlcjogcmdiYSgyMTMsIDIxMywgMjEzLCAwLjI2KTtcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYmFja2dyb3VuZDogI2ZhZmJmYzJiO1xyXG5cdFx0JHtkYXJrfVxyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGRlZmF1bHRTdHlsZSA9IGNzc2BcclxuXHQke3Jlc2V0U3R5bGV9O1xyXG5cdCR7Y29tbW9uU3R5bGV9O1xyXG5cdCR7bGlnaHRTdGx5ZX07XHJcblx0JHtkYXJrU3R5bGV9O1xyXG5gO1xyXG4iXX0= */");
const defaultStyle = /* @__PURE__ */ css(resetStyle, ";", commonStyle, ";", lightStlye, ";", darkStyle, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:defaultStyle;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0dsb2JhbFN0eWxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvaEJ3QiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL2NvbW1vbi9HbG9iYWxTdHlsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHbG9iYWwsIGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY29uc3QgR2xvYmFsU3R5bGU6IEZ1bmN0aW9uQ29tcG9uZW50ID0gKCkgPT4ge1xyXG5cdHJldHVybiA8R2xvYmFsIHN0eWxlcz17ZGVmYXVsdFN0eWxlfSAvPjtcclxufTtcclxuXHJcbmNvbnN0IHByaXNtID0gY3NzYFxyXG5cdGNvZGUsXHJcblx0Y29kZVtjbGFzcyo9J2xhbmd1YWdlLSddLFxyXG5cdHByZVtjbGFzcyo9J2xhbmd1YWdlLSddIHtcclxuXHRcdGNvbG9yOiAjMjQyOTJlO1xyXG5cdH1cclxuXHRwcmUge1xyXG5cdFx0Y29sb3I6ICMyNDI5MmU7XHJcblx0XHRiYWNrZ3JvdW5kOiAjZjZmOGZhO1xyXG5cdH1cclxuXHQudG9rZW4uZnVuY3Rpb24ge1xyXG5cdFx0Y29sb3I6ICMwMDVjYzU7XHJcblx0fVxyXG5cdC50b2tlbi5jb21tZW50LFxyXG5cdC50b2tlbi5wcm9sb2csXHJcblx0LnRva2VuLmRvY3R5cGUsXHJcblx0LnRva2VuLmNkYXRhIHtcclxuXHRcdGNvbG9yOiAjOTY5ODk2O1xyXG5cdH1cclxuXHQudG9rZW4ucHVuY3R1YXRpb24ge1xyXG5cdFx0Y29sb3I6ICMyNDI5MmU7XHJcblx0fVxyXG5cdC50b2tlbi5zdHJpbmcge1xyXG5cdFx0Y29sb3I6ICMwMzJmNjI7XHJcblx0fVxyXG5cdC50b2tlbi5hdHJ1bGUsXHJcblx0LnRva2VuLmF0dHItdmFsdWUge1xyXG5cdFx0Y29sb3I6ICMxODM2OTE7XHJcblx0fVxyXG5cdC50b2tlbi5wcm9wZXJ0eSxcclxuXHQudG9rZW4udGFnIHtcclxuXHRcdGNvbG9yOiAjNjNhMzVjO1xyXG5cdH1cclxuXHQudG9rZW4uYm9vbGVhbixcclxuXHQudG9rZW4ubnVtYmVyIHtcclxuXHRcdGNvbG9yOiAjMDA4NmIzO1xyXG5cdH1cclxuXHQudG9rZW4uc2VsZWN0b3IsXHJcblx0LnRva2VuLmF0dHItbmFtZSxcclxuXHQudG9rZW4uYXR0ci12YWx1ZSAucHVuY3R1YXRpb246Zmlyc3Qtb2YtdHlwZSxcclxuXHQudG9rZW4ua2V5d29yZCxcclxuXHQudG9rZW4ucmVnZXgsXHJcblx0LnRva2VuLmltcG9ydGFudCB7XHJcblx0XHRjb2xvcjogI2Q3M2E0OTtcclxuXHR9XHJcblx0LnRva2VuLm9wZXJhdG9yLFxyXG5cdC50b2tlbi5lbnRpdHksXHJcblx0LnRva2VuLnVybCxcclxuXHQubGFuZ3VhZ2UtY3NzIHtcclxuXHRcdGNvbG9yOiAjZDczYTQ5O1xyXG5cdH1cclxuXHQudG9rZW4uZW50aXR5IHtcclxuXHRcdGN1cnNvcjogaGVscDtcclxuXHR9XHJcblx0Lm5hbWVzcGFjZSB7XHJcblx0XHRvcGFjaXR5OiAwLjc7XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgZGFyayA9IGNzc2BcclxuXHRjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10sXHJcblx0cHJlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xyXG5cdFx0Y29sb3I6ICNjY2M7XHJcblx0XHRiYWNrZ3JvdW5kOiByZ2IoNDAsIDQxLCA1NCk7XHJcblx0fVxyXG5cclxuXHRwcmUge1xyXG5cdFx0dGV4dC1zaGFkb3c6IG5vbmU7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjNWE1ZjgwO1xyXG5cdH1cclxuXHJcblx0LyogSW5saW5lIGNvZGUgKi9cclxuXHJcblx0Om5vdChwcmUpID4gY29kZVtjbGFzcyo9J2xhbmd1YWdlLSddIHtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDAuM2VtO1xyXG5cdFx0d2hpdGUtc3BhY2U6IG5vcm1hbDtcclxuXHR9XHJcblxyXG5cdHByZSB7XHJcblx0XHRjb2xvcjogI2NjYztcclxuXHRcdGJhY2tncm91bmQ6IHJnYig0MCwgNDEsIDU0KTtcclxuXHR9XHJcblxyXG5cdC5saW1pdC0zMDAge1xyXG5cdFx0aGVpZ2h0OiAzMDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTQwMCB7XHJcblx0XHRoZWlnaHQ6IDQwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtNTAwIHtcclxuXHRcdGhlaWdodDogNTAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC5saW1pdC02MDAge1xyXG5cdFx0aGVpZ2h0OiA2MDBweCAhaW1wb3J0YW50O1xyXG5cdH1cclxuXHJcblx0LmxpbWl0LTcwMCB7XHJcblx0XHRoZWlnaHQ6IDcwMHB4ICFpbXBvcnRhbnQ7XHJcblx0fVxyXG5cclxuXHQubGltaXQtODAwIHtcclxuXHRcdGhlaWdodDogODAwcHggIWltcG9ydGFudDtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5jb21tZW50IHtcclxuXHRcdGNvbG9yOiByZ2JhKDk4LCAxMTQsIDE2NCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ucHJvbG9nIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIwNywgMjA3LCAxOTQsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnRhZyB7XHJcblx0XHRjb2xvcjogcmdiYSgyMjAsIDEwNCwgMTcwLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5lbnRpdHkge1xyXG5cdFx0Y29sb3I6IHJnYmEoMTM5LCAyMzMsIDI1MywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYXRydWxlIHtcclxuXHRcdGNvbG9yOiByZ2JhKDk4LCAyMzksIDExNywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4udXJsIHtcclxuXHRcdGNvbG9yOiByZ2JhKDEwMiwgMjE3LCAyMzksIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnNlbGVjdG9yIHtcclxuXHRcdGNvbG9yOiByZ2JhKDIwNywgMjA3LCAxOTQsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogcmdiYSgyNDEsIDI1MCwgMTQwLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5wcm9wZXJ0eSB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5pbXBvcnRhbnQge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxMjEsIDE5OCwgMSk7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5wdW5jdHVhdGlvbiB7XHJcblx0XHRjb2xvcjogcmdiYSgyMzAsIDIxOSwgMTE2LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5udW1iZXIge1xyXG5cdFx0Y29sb3I6IHJnYmEoMTg5LCAxNDcsIDI0OSwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uZnVuY3Rpb24ge1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5jbGFzcy1uYW1lIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTg0LCAxMDgsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmtleXdvcmQge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxMjEsIDE5OCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYm9vbGVhbiB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5vcGVyYXRvciB7XHJcblx0XHRjb2xvcjogcmdiYSgxMzksIDIzMywgMjUzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5jaGFyIHtcclxuXHRcdGNvbG9yOiByZ2JhKDI1NSwgMTM1LCAxNTcsIDEpO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLnJlZ2V4IHtcclxuXHRcdGNvbG9yOiByZ2JhKDgwLCAyNTAsIDEyMywgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4udmFyaWFibGUge1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5jb25zdGFudCB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDE4NCwgMTA4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5zeW1ib2wge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uYnVpbHRpbiB7XHJcblx0XHRjb2xvcjogcmdiYSgyNTUsIDEyMSwgMTk4LCAxKTtcclxuXHR9XHJcblxyXG5cdC50b2tlbi5hdHRyLXZhbHVlIHtcclxuXHRcdGNvbG9yOiAjN2VjNjk5O1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmRlbGV0ZWQge1xyXG5cdFx0Y29sb3I6ICNlMjc3N2E7XHJcblx0fVxyXG5cclxuXHQudG9rZW4ubmFtZXNwYWNlIHtcclxuXHRcdGNvbG9yOiAjZTI3NzdhO1xyXG5cdH1cclxuXHJcblx0LnRva2VuLmJvbGQge1xyXG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0fVxyXG5cclxuXHQudG9rZW4uaXRhbGljIHtcclxuXHRcdGZvbnQtc3R5bGU6IGl0YWxpYztcclxuXHR9XHJcblxyXG5cdC50b2tlbiB7XHJcblx0XHRjb2xvcjogI2ZmNzljNjtcclxuXHR9XHJcblxyXG5cdC5sYW5nYWd1ZS1jcHAgLnRva2VuLnN0cmluZyB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5nYWd1ZS1jIC50b2tlbi5zdHJpbmcge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtY3NzIC50b2tlbi5zZWxlY3RvciB7XHJcblx0XHRjb2xvcjogcmdiYSg4MCwgMjUwLCAxMjMsIDEpO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLWNzcyAudG9rZW4ucHJvcGVydHkge1xyXG5cdFx0Y29sb3I6IHJnYmEoMjU1LCAxODQsIDEwOCwgMSk7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtamF2YSBzcGFuLnRva2VuLmNsYXNzLW5hbWUge1xyXG5cdFx0Y29sb3I6ICM4YmU5ZmQ7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtamF2YSAudG9rZW4uY2xhc3MtbmFtZSB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1tYXJrdXAgLnRva2VuLmF0dHItdmFsdWUge1xyXG5cdFx0Y29sb3I6IHJnYmEoMTAyLCAyMTcsIDIzOSwgMSk7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtbWFya3VwIC50b2tlbi50YWcge1xyXG5cdFx0Y29sb3I6IHJnYmEoODAsIDI1MCwgMTIzLCAxKTtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1vYmplY3RpdmVjIC50b2tlbi5wcm9wZXJ0eSB7XHJcblx0XHRjb2xvcjogIzY2ZDllZjtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1vYmplY3RpdmVjIC50b2tlbi5zdHJpbmcge1xyXG5cdFx0Y29sb3I6ICM1MGZhN2I7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcGhwIC50b2tlbi5ib29sZWFuIHtcclxuXHRcdGNvbG9yOiAjOGJlOWZkO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLXBocCAudG9rZW4uZnVuY3Rpb24ge1xyXG5cdFx0Y29sb3I6ICNmZjc5YzY7XHJcblx0fVxyXG5cclxuXHQubGFuZ3VhZ2UtcGhwIC50b2tlbi5rZXl3b3JkIHtcclxuXHRcdGNvbG9yOiAjNjZkOWVmO1xyXG5cdH1cclxuXHJcblx0Lmxhbmd1YWdlLXJ1YnkgLnRva2VuLnN5bWJvbCB7XHJcblx0XHRjb2xvcjogIzhiZTlmZDtcclxuXHR9XHJcblxyXG5cdC5sYW5ndWFnZS1ydWJ5IC50b2tlbi5jbGFzcy1uYW1lIHtcclxuXHRcdGNvbG9yOiAjY2ZjZmMyO1xyXG5cdH1cclxuXHJcblx0cHJlLmxpbmUtbnVtYmVycyB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRwYWRkaW5nLWxlZnQ6IDMuOGVtO1xyXG5cdFx0Y291bnRlci1yZXNldDogbGluZW51bWJlcjtcclxuXHR9XHJcblxyXG5cdHByZS5saW5lLW51bWJlcnMgPiBjb2RlIHtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdHdoaXRlLXNwYWNlOiBpbmhlcml0O1xyXG5cdH1cclxuXHJcblx0LmxpbmUtbnVtYmVycyAubGluZS1udW1iZXJzLXJvd3Mge1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XHJcblx0XHR0b3A6IDA7XHJcblx0XHRmb250LXNpemU6IDEwMCU7XHJcblx0XHRsZWZ0OiAtMy44ZW07XHJcblx0XHR3aWR0aDogM2VtO1xyXG5cdFx0Lyogd29ya3MgZm9yIGxpbmUtbnVtYmVycyBiZWxvdyAxMDAwIGxpbmVzICovXHJcblx0XHRsZXR0ZXItc3BhY2luZzogLTFweDtcclxuXHRcdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICM5OTk7XHJcblx0XHQtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcclxuXHRcdC1tcy11c2VyLXNlbGVjdDogbm9uZTtcclxuXHRcdHVzZXItc2VsZWN0OiBub25lO1xyXG5cdH1cclxuXHJcblx0LmxpbmUtbnVtYmVycy1yb3dzID4gc3BhbiB7XHJcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZTtcclxuXHRcdGRpc3BsYXk6IGJsb2NrO1xyXG5cdFx0Y291bnRlci1pbmNyZW1lbnQ6IGxpbmVudW1iZXI7XHJcblx0fVxyXG5cclxuXHQubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuOmJlZm9yZSB7XHJcblx0XHRjb250ZW50OiBjb3VudGVyKGxpbmVudW1iZXIpO1xyXG5cdFx0Y29sb3I6ICM5OTk7XHJcblx0XHRkaXNwbGF5OiBibG9jaztcclxuXHRcdHBhZGRpbmctcmlnaHQ6IDAuOGVtO1xyXG5cdFx0dGV4dC1hbGlnbjogcmlnaHQ7XHJcblx0fVxyXG5cclxuXHRkaXYuY29kZS10b29sYmFyIHtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR0b3A6IDAuM2VtO1xyXG5cdFx0cmlnaHQ6IDAuMmVtO1xyXG5cdFx0dHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2UtaW4tb3V0O1xyXG5cdFx0b3BhY2l0eTogMDtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXI6aG92ZXIgPiAudG9vbGJhciB7XHJcblx0XHRvcGFjaXR5OiAxO1xyXG5cdH1cclxuXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIC50b29sYmFyLWl0ZW0ge1xyXG5cdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG5cdFx0cGFkZGluZy1yaWdodDogMjBweDtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBhIHtcclxuXHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBidXR0b24ge1xyXG5cdFx0YmFja2dyb3VuZDogbm9uZTtcclxuXHRcdGJvcmRlcjogMDtcclxuXHRcdGNvbG9yOiBpbmhlcml0O1xyXG5cdFx0Zm9udDogaW5oZXJpdDtcclxuXHRcdGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcblx0XHRvdmVyZmxvdzogdmlzaWJsZTtcclxuXHRcdHBhZGRpbmc6IDA7XHJcblx0XHQtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG5cdFx0LyogZm9yIGJ1dHRvbiAqL1xyXG5cdFx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcclxuXHRcdC1tcy11c2VyLXNlbGVjdDogbm9uZTtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBhLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBidXR0b24sXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIHNwYW4ge1xyXG5cdFx0Y29sb3I6ICNjY2M7XHJcblx0XHRmb250LXNpemU6IDAuOGVtO1xyXG5cdFx0cGFkZGluZzogMC41ZW07XHJcblx0XHRiYWNrZ3JvdW5kOiByZ2JhKDk4LCAxMTQsIDE2NCwgMSk7XHJcblx0XHRib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuXHR9XHJcblxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBhOmhvdmVyLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBhOmZvY3VzLFxyXG5cdGRpdi5jb2RlLXRvb2xiYXIgPiAudG9vbGJhciBidXR0b246aG92ZXIsXHJcblx0ZGl2LmNvZGUtdG9vbGJhciA+IC50b29sYmFyIGJ1dHRvbjpmb2N1cyxcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgc3Bhbjpob3ZlcixcclxuXHRkaXYuY29kZS10b29sYmFyID4gLnRvb2xiYXIgc3Bhbjpmb2N1cyB7XHJcblx0XHRjb2xvcjogaW5oZXJpdDtcclxuXHRcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLXZlcmRlKTtcclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCByZXNldFN0eWxlID0gY3NzYFxyXG5cdC8qISBtaW5pcmVzZXQuY3NzIHYwLjAuNiB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9qZ3RobXMvbWluaXJlc2V0LmNzcyAqL1xyXG5cdGJsb2NrcXVvdGUsXHJcblx0Ym9keSxcclxuXHRkZCxcclxuXHRkbCxcclxuXHRkdCxcclxuXHRmaWVsZHNldCxcclxuXHRmaWd1cmUsXHJcblx0aDEsXHJcblx0aDIsXHJcblx0aDMsXHJcblx0aDQsXHJcblx0aDUsXHJcblx0aDYsXHJcblx0aHIsXHJcblx0aHRtbCxcclxuXHRpZnJhbWUsXHJcblx0bGVnZW5kLFxyXG5cdGxpLFxyXG5cdG9sLFxyXG5cdHAsXHJcblx0cHJlLFxyXG5cdHRleHRhcmVhLFxyXG5cdHVsIHtcclxuXHRcdG1hcmdpbjogMDtcclxuXHRcdHBhZGRpbmc6IDA7XHJcblx0fVxyXG5cdGgxLFxyXG5cdGgyLFxyXG5cdGgzLFxyXG5cdGg0LFxyXG5cdGg1LFxyXG5cdGg2IHtcclxuXHRcdGZvbnQtc2l6ZTogMTAwJTtcclxuXHRcdGZvbnQtd2VpZ2h0OiA0MDA7XHJcblx0fVxyXG5cdHVsIHtcclxuXHRcdGxpc3Qtc3R5bGU6IG5vbmU7XHJcblx0fVxyXG5cdGJ1dHRvbixcclxuXHRpbnB1dCxcclxuXHRzZWxlY3Qge1xyXG5cdFx0bWFyZ2luOiAwO1xyXG5cdH1cclxuXHRodG1sIHtcclxuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0fVxyXG5cdCosXHJcblx0OmFmdGVyLFxyXG5cdDpiZWZvcmUge1xyXG5cdFx0Ym94LXNpemluZzogaW5oZXJpdDtcclxuXHR9XHJcblx0aW1nLFxyXG5cdHZpZGVvIHtcclxuXHRcdGhlaWdodDogYXV0bztcclxuXHRcdG1heC13aWR0aDogMTAwJTtcclxuXHR9XHJcblx0aWZyYW1lIHtcclxuXHRcdGJvcmRlcjogMDtcclxuXHR9XHJcblx0dGFibGUge1xyXG5cdFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuXHRcdGJvcmRlci1zcGFjaW5nOiAwO1xyXG5cdH1cclxuXHR0ZCxcclxuXHR0aCB7XHJcblx0XHRwYWRkaW5nOiAwO1xyXG5cdH1cclxuXHRhIHtcclxuXHRcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuXHRcdGNvbG9yOiB2YXIoLS1jb2xvcnMtdGV4dCk7XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgY29tbW9uU3R5bGUgPSBjc3NgXHJcblx0OnJvb3Qge1xyXG5cdFx0LS1jb2xvcnMtcHJpbWFyeTogcmdiKDc2LCAyMDksIDU1KTtcclxuXHRcdC0tY29sb3JzLWJhY2tncm91bmQyOiByZ2IoMTEzLCAxMjgsIDE0Nyk7XHJcblx0XHQtLWNvbG9ycy1hbmNob3I6IHJnYigwLCAxNjgsIDI1NSk7XHJcblx0XHQtLWNvbG9ycy1zZWNvbmRhcnktdGV4dDogIzllOWU5ZTtcclxuXHRcdC0tY29sb3JzLXRpcC1iYWNrZ3JvdW5kOiAjOTM5MzkzO1xyXG5cdFx0LS1jb2xvcnMtYWJvdXQtbGluay1pY29uOiAjYThhOGE4O1xyXG5cdFx0LS1jb2xvcnMtcGFzdGU6ICNhY2JhYzdhODtcclxuXHRcdC0tY29sb3JzLXBhc3RlLWhvdmVyOiAjYWNiYWM3O1xyXG5cdH1cclxuXHJcblx0aHRtbCB7XHJcblx0XHRvdmVyZmxvdy15OiBzY3JvbGw7XHJcblx0fVxyXG5cclxuXHQvKiDsiqTtgazroaTrsJTsnZgg7Y+tIOuEiOu5hCAqL1xyXG5cdDo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG5cdFx0d2lkdGg6IDVweDtcclxuXHRcdGhlaWdodDogOHB4O1xyXG5cdH1cclxuXHJcblx0Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcblx0XHRiYWNrZ3JvdW5kOiAjNjY2NjY2NmE7IC8qIOyKpO2BrOuhpOuwlCDsg4nsg4EgKi9cclxuXHRcdGJvcmRlci1yYWRpdXM6IDEwcHg7IC8qIOyKpO2BrOuhpOuwlCDrkaXqt7wg7YWM65GQ66asICovXHJcblx0fVxyXG5cclxuXHQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuXHRcdGJhY2tncm91bmQ6ICNkZGQ7IC8q7Iqk7YGs66Gk67CUIOuStyDrsLDqsr0g7IOJ7IOBKi9cclxuXHR9XHJcbmA7XHJcblxyXG5jb25zdCBsaWdodFN0bHllID0gY3NzYFxyXG5cdGJvZHlbZGF0YS10aGVtZT0nbGlnaHQnXSB7XHJcblx0XHQtLWNvbG9ycy10ZXh0OiBibGFjaztcclxuXHRcdC0tY29sb3JzLWJhY2tncm91bmQ6IHdoaXRlO1xyXG5cdFx0LS1jb2xvcnMtdGFiLXRleHQ6ICM2ZTZkN2E7XHJcblx0XHQtLWNvbG9ycy10YWItc2VsZWN0ZWQ6ICMwZDBjMjI7XHJcblx0XHQtLWNvbG9ycy10YWItc2VsZWN0ZWQtYmFja2dyb3VuZDogcmdiYSgxMywgMTIsIDM0LCAwLjA1KTtcclxuXHRcdC0tY29sb3JzLXBvc3QtY2FyZC1ib3JkZXI6IHJnYmEoMCwgMCwgMCwgMC4xMik7XHJcblx0XHQtLWNvbG9ycy1ibG9ja3F1b3RlLWJvcmRlcjogcmdiYSgyNTUsIDkyLCAwLCAwLjcpO1xyXG5cdFx0LS1jb2xvcnMtY29udGVudC10ZXh0OiAjMzczNTJmO1xyXG5cdFx0LS1jb2xvcnMtYWJvdXQtbGluay1pY29uLWhvdmVyOiByZ2JhKDAsIDAsIDAsIDAuMDYpO1xyXG5cdFx0LS1jb2xvcnMtYmxvY2txdW90ZS1iYWNrZ3JvdW5kOiAjZjJmZmVlNzU7XHJcblx0XHQke3ByaXNtfVxyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGRhcmtTdHlsZSA9IGNzc2BcclxuXHRib2R5W2RhdGEtdGhlbWU9J2RhcmsnXSB7XHJcblx0XHQtLWNvbG9ycy10ZXh0OiB3aGl0ZTtcclxuXHRcdC0tY29sb3JzLWJhY2tncm91bmQ6IGJsYWNrO1xyXG5cdFx0LS1jb2xvcnMtdGFiLXRleHQ6ICM3NjgzOTA7XHJcblx0XHQtLWNvbG9ycy10YWItc2VsZWN0ZWQ6ICNhY2JhYzc7XHJcblx0XHQtLWNvbG9ycy10YWItc2VsZWN0ZWQtYmFja2dyb3VuZDogIzM3M2U0NztcclxuXHRcdC0tY29sb3JzLXBvc3QtY2FyZC1ib3JkZXI6ICMzNjNmNDc7XHJcblx0XHQtLWNvbG9ycy1ibG9ja3F1b3RlLWJvcmRlcjogI2ZmNWMwMDtcclxuXHRcdC0tY29sb3JzLWNvbnRlbnQtdGV4dDogI2U2ZTZlNjtcclxuXHRcdC0tY29sb3JzLWFib3V0LWxpbmstaWNvbi1ob3ZlcjogcmdiYSgyMTMsIDIxMywgMjEzLCAwLjI2KTtcclxuXHRcdC0tY29sb3JzLWJsb2NrcXVvdGUtYmFja2dyb3VuZDogI2ZhZmJmYzJiO1xyXG5cdFx0JHtkYXJrfVxyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGRlZmF1bHRTdHlsZSA9IGNzc2BcclxuXHQke3Jlc2V0U3R5bGV9O1xyXG5cdCR7Y29tbW9uU3R5bGV9O1xyXG5cdCR7bGlnaHRTdGx5ZX07XHJcblx0JHtkYXJrU3R5bGV9O1xyXG5gO1xyXG4iXX0= */");

function _EMOTION_STRINGIFIED_CSS_ERROR__$9() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const Header$1 = () => {
  return /* @__PURE__ */ jsx(Wrapper$9, { children: /* @__PURE__ */ jsxs(ContentWrapper, { children: [
    /* @__PURE__ */ jsx(Link, { to: "/", children: "CHUG ALONG" }),
    /* @__PURE__ */ jsx(Navigation$2, { children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(StyledLink$2, { to: "/", children: /* @__PURE__ */ jsx("span", { children: "HOME" }) }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(StyledLink$2, { to: "/about", children: /* @__PURE__ */ jsx("span", { children: "ABOUT" }) }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(StyledLink$2, { to: "/posts", children: /* @__PURE__ */ jsx("span", { children: "POSTS" }) }) })
    ] }) })
  ] }) });
};
const Wrapper$9 = /* @__PURE__ */ _styled("header", process.env.NODE_ENV === "production" ? {
  target: "e1k8lfdn3"
} : {
  target: "e1k8lfdn3",
  label: "Wrapper"
})(process.env.NODE_ENV === "production" ? {
  name: "1jgg4ac",
  styles: "height:60px;width:100%;display:flex;justify-content:center;align-items:center"
} : {
  name: "1jgg4ac",
  styles: "height:60px;width:100%;display:flex;justify-content:center;align-items:center",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0hlYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUNnQiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL2NvbW1vbi9IZWFkZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBMaW5rLCBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnLi90aGVtZSc7XHJcblxyXG5leHBvcnQgY29uc3QgSGVhZGVyID0gKCkgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0PENvbnRlbnRXcmFwcGVyPlxyXG5cdFx0XHRcdDxMaW5rIHRvPVwiL1wiPkNIVUcgQUxPTkc8L0xpbms+XHJcblx0XHRcdFx0PE5hdmlnYXRpb24+XHJcblx0XHRcdFx0XHQ8dWw+XHJcblx0XHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0XHQ8U3R5bGVkTGluayB0bz1cIi9cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPkhPTUU8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PC9TdHlsZWRMaW5rPlxyXG5cdFx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0PFN0eWxlZExpbmsgdG89XCIvYWJvdXRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPkFCT1VUPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDwvU3R5bGVkTGluaz5cclxuXHRcdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHRcdDxTdHlsZWRMaW5rIHRvPVwiL3Bvc3RzXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5QT1NUUzwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8L1N0eWxlZExpbms+XHJcblx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHRcdDwvTmF2aWdhdGlvbj5cclxuXHRcdFx0PC9Db250ZW50V3JhcHBlcj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5oZWFkZXIoe1xyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxufSk7XHJcblxyXG5jb25zdCBDb250ZW50V3JhcHBlciA9IHN0eWxlZC5kaXYoe1xyXG5cdG1heFdpZHRoOiAnNzIwcHgnLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0aGVpZ2h0OiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcblx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblxyXG5cdCcmID4gYSc6IHtcclxuXHRcdGZvbnRTaXplOiAnMS4zcmVtJyxcclxuXHRcdGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuXHR9LFxyXG59KTtcclxuXHJcbmNvbnN0IE5hdmlnYXRpb24gPSBzdHlsZWQubmF2KHtcclxuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcxMDAlJyxcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cclxuXHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0Y29udGVudDogJ1wiXCInLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRsZWZ0OiAnMjVweCcsXHJcblx0XHRyaWdodDogJzI1cHgnLFxyXG5cdFx0dG9wOiAnNTAlJyxcclxuXHRcdGJvcmRlclRvcDogYDJweCBzb2xpZCAke3RoZW1lLmNvbG9ycy50ZXh0fWAsXHJcblx0fSxcclxuXHJcblx0JyYgPiB1bCc6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHR0b3A6ICcxMnB4JyxcclxuXHJcblx0XHQnJiA+IGxpJzoge1xyXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdFx0d2lkdGg6ICc1MHB4JyxcclxuXHJcblx0XHRcdCcmOjphZnRlcic6IHtcclxuXHRcdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdFx0Ym9yZGVyTGVmdDogYDFweCBzb2xpZCAke3RoZW1lLmNvbG9ycy50ZXh0fWAsXHJcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0d2lkdGg6ICcxcHgnLFxyXG5cdFx0XHRcdGhlaWdodDogJzEzcHgnLFxyXG5cdFx0XHRcdGxlZnQ6ICc1MCUnLFxyXG5cdFx0XHRcdHRvcDogJy0xN3B4JyxcclxuXHRcdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdCcmIHNwYW4nOiB7XHJcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0dHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLWluLW91dDsnLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblxyXG5cdFx0XHRcdCcmOmhvdmVyJzoge1xyXG5cdFx0XHRcdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdCcmOmhvdmVyJzoge1xyXG5cdFx0JyYgc3Bhbic6IHtcclxuXHRcdFx0b3BhY2l0eTogMSxcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcblxyXG5jb25zdCBTdHlsZWRMaW5rID0gc3R5bGVkKE5hdkxpbmspKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblxyXG5cdCcmLmFjdGl2ZSc6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHR3aWR0aDogJzEzcHgnLFxyXG5cdFx0XHRoZWlnaHQ6ICcxM3B4JyxcclxuXHRcdFx0bGVmdDogJzUwJScsXHJcblx0XHRcdHRvcDogJy0xN3B4JyxcclxuXHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXHJcblx0XHRcdHpJbmRleDogMSxcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$9
});
const ContentWrapper = /* @__PURE__ */ _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e1k8lfdn2"
} : {
  target: "e1k8lfdn2",
  label: "ContentWrapper"
})(process.env.NODE_ENV === "production" ? {
  name: "7c7laq",
  styles: "max-width:720px;width:100%;height:100%;display:flex;justify-content:space-between;align-items:center;& > a{font-size:1.3rem;font-weight:bold;}"
} : {
  name: "7c7laq",
  styles: "max-width:720px;width:100%;height:100%;display:flex;justify-content:space-between;align-items:center;& > a{font-size:1.3rem;font-weight:bold;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0hlYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUN1QiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL2NvbW1vbi9IZWFkZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBMaW5rLCBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnLi90aGVtZSc7XHJcblxyXG5leHBvcnQgY29uc3QgSGVhZGVyID0gKCkgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0PENvbnRlbnRXcmFwcGVyPlxyXG5cdFx0XHRcdDxMaW5rIHRvPVwiL1wiPkNIVUcgQUxPTkc8L0xpbms+XHJcblx0XHRcdFx0PE5hdmlnYXRpb24+XHJcblx0XHRcdFx0XHQ8dWw+XHJcblx0XHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0XHQ8U3R5bGVkTGluayB0bz1cIi9cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPkhPTUU8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PC9TdHlsZWRMaW5rPlxyXG5cdFx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0PFN0eWxlZExpbmsgdG89XCIvYWJvdXRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPkFCT1VUPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDwvU3R5bGVkTGluaz5cclxuXHRcdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHRcdDxTdHlsZWRMaW5rIHRvPVwiL3Bvc3RzXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5QT1NUUzwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8L1N0eWxlZExpbms+XHJcblx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHRcdDwvTmF2aWdhdGlvbj5cclxuXHRcdFx0PC9Db250ZW50V3JhcHBlcj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5oZWFkZXIoe1xyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxufSk7XHJcblxyXG5jb25zdCBDb250ZW50V3JhcHBlciA9IHN0eWxlZC5kaXYoe1xyXG5cdG1heFdpZHRoOiAnNzIwcHgnLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0aGVpZ2h0OiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcblx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblxyXG5cdCcmID4gYSc6IHtcclxuXHRcdGZvbnRTaXplOiAnMS4zcmVtJyxcclxuXHRcdGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuXHR9LFxyXG59KTtcclxuXHJcbmNvbnN0IE5hdmlnYXRpb24gPSBzdHlsZWQubmF2KHtcclxuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcxMDAlJyxcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cclxuXHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0Y29udGVudDogJ1wiXCInLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRsZWZ0OiAnMjVweCcsXHJcblx0XHRyaWdodDogJzI1cHgnLFxyXG5cdFx0dG9wOiAnNTAlJyxcclxuXHRcdGJvcmRlclRvcDogYDJweCBzb2xpZCAke3RoZW1lLmNvbG9ycy50ZXh0fWAsXHJcblx0fSxcclxuXHJcblx0JyYgPiB1bCc6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHR0b3A6ICcxMnB4JyxcclxuXHJcblx0XHQnJiA+IGxpJzoge1xyXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdFx0d2lkdGg6ICc1MHB4JyxcclxuXHJcblx0XHRcdCcmOjphZnRlcic6IHtcclxuXHRcdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdFx0Ym9yZGVyTGVmdDogYDFweCBzb2xpZCAke3RoZW1lLmNvbG9ycy50ZXh0fWAsXHJcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0d2lkdGg6ICcxcHgnLFxyXG5cdFx0XHRcdGhlaWdodDogJzEzcHgnLFxyXG5cdFx0XHRcdGxlZnQ6ICc1MCUnLFxyXG5cdFx0XHRcdHRvcDogJy0xN3B4JyxcclxuXHRcdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdCcmIHNwYW4nOiB7XHJcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0dHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLWluLW91dDsnLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblxyXG5cdFx0XHRcdCcmOmhvdmVyJzoge1xyXG5cdFx0XHRcdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdCcmOmhvdmVyJzoge1xyXG5cdFx0JyYgc3Bhbic6IHtcclxuXHRcdFx0b3BhY2l0eTogMSxcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcblxyXG5jb25zdCBTdHlsZWRMaW5rID0gc3R5bGVkKE5hdkxpbmspKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblxyXG5cdCcmLmFjdGl2ZSc6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHR3aWR0aDogJzEzcHgnLFxyXG5cdFx0XHRoZWlnaHQ6ICcxM3B4JyxcclxuXHRcdFx0bGVmdDogJzUwJScsXHJcblx0XHRcdHRvcDogJy0xN3B4JyxcclxuXHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXHJcblx0XHRcdHpJbmRleDogMSxcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$9
});
const Navigation$2 = /* @__PURE__ */ _styled("nav", process.env.NODE_ENV === "production" ? {
  target: "e1k8lfdn1"
} : {
  target: "e1k8lfdn1",
  label: "Navigation"
})({
  position: "relative",
  width: "200px",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "25px",
    right: "25px",
    top: "50%",
    borderTop: `2px solid ${theme.colors.text}`
  },
  "& > ul": {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    top: "12px",
    "& > li": {
      position: "relative",
      width: "50px",
      "&::after": {
        content: '""',
        borderLeft: `1px solid ${theme.colors.text}`,
        position: "absolute",
        width: "1px",
        height: "13px",
        left: "50%",
        top: "-17px",
        transform: "translateX(-50%)"
      },
      "& span": {
        position: "absolute",
        transition: "opacity 0.5s ease-in-out;",
        opacity: 0,
        "&:hover": {
          color: theme.colors.primary
        }
      }
    }
  },
  "&:hover": {
    "& span": {
      opacity: 1
    }
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0hlYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdURtQiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL2NvbW1vbi9IZWFkZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBMaW5rLCBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnLi90aGVtZSc7XHJcblxyXG5leHBvcnQgY29uc3QgSGVhZGVyID0gKCkgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0PENvbnRlbnRXcmFwcGVyPlxyXG5cdFx0XHRcdDxMaW5rIHRvPVwiL1wiPkNIVUcgQUxPTkc8L0xpbms+XHJcblx0XHRcdFx0PE5hdmlnYXRpb24+XHJcblx0XHRcdFx0XHQ8dWw+XHJcblx0XHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0XHQ8U3R5bGVkTGluayB0bz1cIi9cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPkhPTUU8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PC9TdHlsZWRMaW5rPlxyXG5cdFx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0PFN0eWxlZExpbmsgdG89XCIvYWJvdXRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPkFCT1VUPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDwvU3R5bGVkTGluaz5cclxuXHRcdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHRcdDxTdHlsZWRMaW5rIHRvPVwiL3Bvc3RzXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5QT1NUUzwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8L1N0eWxlZExpbms+XHJcblx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHRcdDwvTmF2aWdhdGlvbj5cclxuXHRcdFx0PC9Db250ZW50V3JhcHBlcj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5oZWFkZXIoe1xyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxufSk7XHJcblxyXG5jb25zdCBDb250ZW50V3JhcHBlciA9IHN0eWxlZC5kaXYoe1xyXG5cdG1heFdpZHRoOiAnNzIwcHgnLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0aGVpZ2h0OiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcblx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblxyXG5cdCcmID4gYSc6IHtcclxuXHRcdGZvbnRTaXplOiAnMS4zcmVtJyxcclxuXHRcdGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuXHR9LFxyXG59KTtcclxuXHJcbmNvbnN0IE5hdmlnYXRpb24gPSBzdHlsZWQubmF2KHtcclxuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcxMDAlJyxcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cclxuXHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0Y29udGVudDogJ1wiXCInLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRsZWZ0OiAnMjVweCcsXHJcblx0XHRyaWdodDogJzI1cHgnLFxyXG5cdFx0dG9wOiAnNTAlJyxcclxuXHRcdGJvcmRlclRvcDogYDJweCBzb2xpZCAke3RoZW1lLmNvbG9ycy50ZXh0fWAsXHJcblx0fSxcclxuXHJcblx0JyYgPiB1bCc6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHR0b3A6ICcxMnB4JyxcclxuXHJcblx0XHQnJiA+IGxpJzoge1xyXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdFx0d2lkdGg6ICc1MHB4JyxcclxuXHJcblx0XHRcdCcmOjphZnRlcic6IHtcclxuXHRcdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdFx0Ym9yZGVyTGVmdDogYDFweCBzb2xpZCAke3RoZW1lLmNvbG9ycy50ZXh0fWAsXHJcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0d2lkdGg6ICcxcHgnLFxyXG5cdFx0XHRcdGhlaWdodDogJzEzcHgnLFxyXG5cdFx0XHRcdGxlZnQ6ICc1MCUnLFxyXG5cdFx0XHRcdHRvcDogJy0xN3B4JyxcclxuXHRcdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdCcmIHNwYW4nOiB7XHJcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0dHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLWluLW91dDsnLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblxyXG5cdFx0XHRcdCcmOmhvdmVyJzoge1xyXG5cdFx0XHRcdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdCcmOmhvdmVyJzoge1xyXG5cdFx0JyYgc3Bhbic6IHtcclxuXHRcdFx0b3BhY2l0eTogMSxcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcblxyXG5jb25zdCBTdHlsZWRMaW5rID0gc3R5bGVkKE5hdkxpbmspKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblxyXG5cdCcmLmFjdGl2ZSc6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHR3aWR0aDogJzEzcHgnLFxyXG5cdFx0XHRoZWlnaHQ6ICcxM3B4JyxcclxuXHRcdFx0bGVmdDogJzUwJScsXHJcblx0XHRcdHRvcDogJy0xN3B4JyxcclxuXHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXHJcblx0XHRcdHpJbmRleDogMSxcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcbiJdfQ== */");
const StyledLink$2 = /* @__PURE__ */ _styled(NavLink, process.env.NODE_ENV === "production" ? {
  target: "e1k8lfdn0"
} : {
  target: "e1k8lfdn0",
  label: "StyledLink"
})({
  color: theme.colors.text,
  "&.active": {
    color: theme.colors.primary,
    "&::before": {
      content: '""',
      backgroundColor: theme.colors.primary,
      position: "absolute",
      width: "13px",
      height: "13px",
      left: "50%",
      top: "-17px",
      transform: "translateX(-50%)",
      zIndex: 1
    }
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL0hlYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUhtQiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL2NvbW1vbi9IZWFkZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBMaW5rLCBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnLi90aGVtZSc7XHJcblxyXG5leHBvcnQgY29uc3QgSGVhZGVyID0gKCkgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0PENvbnRlbnRXcmFwcGVyPlxyXG5cdFx0XHRcdDxMaW5rIHRvPVwiL1wiPkNIVUcgQUxPTkc8L0xpbms+XHJcblx0XHRcdFx0PE5hdmlnYXRpb24+XHJcblx0XHRcdFx0XHQ8dWw+XHJcblx0XHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0XHQ8U3R5bGVkTGluayB0bz1cIi9cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPkhPTUU8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PC9TdHlsZWRMaW5rPlxyXG5cdFx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0PFN0eWxlZExpbmsgdG89XCIvYWJvdXRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPkFCT1VUPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDwvU3R5bGVkTGluaz5cclxuXHRcdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHRcdDxTdHlsZWRMaW5rIHRvPVwiL3Bvc3RzXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5QT1NUUzwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8L1N0eWxlZExpbms+XHJcblx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHRcdDwvTmF2aWdhdGlvbj5cclxuXHRcdFx0PC9Db250ZW50V3JhcHBlcj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5oZWFkZXIoe1xyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxufSk7XHJcblxyXG5jb25zdCBDb250ZW50V3JhcHBlciA9IHN0eWxlZC5kaXYoe1xyXG5cdG1heFdpZHRoOiAnNzIwcHgnLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0aGVpZ2h0OiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcblx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblxyXG5cdCcmID4gYSc6IHtcclxuXHRcdGZvbnRTaXplOiAnMS4zcmVtJyxcclxuXHRcdGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuXHR9LFxyXG59KTtcclxuXHJcbmNvbnN0IE5hdmlnYXRpb24gPSBzdHlsZWQubmF2KHtcclxuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcxMDAlJyxcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cclxuXHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0Y29udGVudDogJ1wiXCInLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRsZWZ0OiAnMjVweCcsXHJcblx0XHRyaWdodDogJzI1cHgnLFxyXG5cdFx0dG9wOiAnNTAlJyxcclxuXHRcdGJvcmRlclRvcDogYDJweCBzb2xpZCAke3RoZW1lLmNvbG9ycy50ZXh0fWAsXHJcblx0fSxcclxuXHJcblx0JyYgPiB1bCc6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHR0b3A6ICcxMnB4JyxcclxuXHJcblx0XHQnJiA+IGxpJzoge1xyXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdFx0d2lkdGg6ICc1MHB4JyxcclxuXHJcblx0XHRcdCcmOjphZnRlcic6IHtcclxuXHRcdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdFx0Ym9yZGVyTGVmdDogYDFweCBzb2xpZCAke3RoZW1lLmNvbG9ycy50ZXh0fWAsXHJcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0d2lkdGg6ICcxcHgnLFxyXG5cdFx0XHRcdGhlaWdodDogJzEzcHgnLFxyXG5cdFx0XHRcdGxlZnQ6ICc1MCUnLFxyXG5cdFx0XHRcdHRvcDogJy0xN3B4JyxcclxuXHRcdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdCcmIHNwYW4nOiB7XHJcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0dHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLWluLW91dDsnLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblxyXG5cdFx0XHRcdCcmOmhvdmVyJzoge1xyXG5cdFx0XHRcdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdCcmOmhvdmVyJzoge1xyXG5cdFx0JyYgc3Bhbic6IHtcclxuXHRcdFx0b3BhY2l0eTogMSxcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcblxyXG5jb25zdCBTdHlsZWRMaW5rID0gc3R5bGVkKE5hdkxpbmspKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblxyXG5cdCcmLmFjdGl2ZSc6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHR3aWR0aDogJzEzcHgnLFxyXG5cdFx0XHRoZWlnaHQ6ICcxM3B4JyxcclxuXHRcdFx0bGVmdDogJzUwJScsXHJcblx0XHRcdHRvcDogJy0xN3B4JyxcclxuXHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXHJcblx0XHRcdHpJbmRleDogMSxcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcbiJdfQ== */");

const isNum = (v) => typeof v === "number" && !isNaN(v);
const isStr = (v) => typeof v === "string";

var Event = /* @__PURE__ */ ((Event2) => {
  Event2[Event2["Show"] = 0] = "Show";
  Event2[Event2["Clear"] = 1] = "Clear";
  Event2[Event2["DidMount"] = 2] = "DidMount";
  Event2[Event2["WillUnmount"] = 3] = "WillUnmount";
  Event2[Event2["Change"] = 4] = "Change";
  Event2[Event2["ClearWaitingQueue"] = 5] = "ClearWaitingQueue";
  return Event2;
})(Event || {});
const eventManager = {
  list: /* @__PURE__ */ new Map(),
  emitQueue: /* @__PURE__ */ new Map(),
  on(event, callback) {
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event).push(callback);
    return this;
  },
  off(event, callback) {
    if (callback) {
      const cb = this.list.get(event).filter((cb2) => cb2 !== callback);
      this.list.set(event, cb);
      return this;
    }
    this.list.delete(event);
    return this;
  },
  cancelEmit(event) {
    const timers = this.emitQueue.get(event);
    if (timers) {
      timers.forEach(clearTimeout);
      this.emitQueue.delete(event);
    }
    return this;
  },
  /**
   * Enqueue the event at the end of the call stack
   * Doing so let the user call toast as follow:
   * toast('1')
   * toast('2')
   * toast('3')
   * Without setTimemout the code above will not work
   */
  emit(event, ...args) {
    this.list.has(event) && this.list.get(event).forEach((callback) => {
      const timer = setTimeout(() => {
        callback(...args);
      }, 0);
      this.emitQueue.has(event) || this.emitQueue.set(event, []);
      this.emitQueue.get(event).push(timer);
    });
  }
};

let TOAST_ID = 1;
function generateToastId() {
  return `${TOAST_ID++}`;
}
function getToastId(options) {
  return options && (isStr(options.toastId) || isNum(options.toastId)) ? options.toastId : generateToastId();
}
function mergeOptions(options) {
  return {
    ...options,
    toastId: getToastId(options)
  };
}
function toast(content, options) {
  return dispatchToast(content, mergeOptions(options));
}
function dispatchToast(content, options) {
  eventManager.emit(Event.Show, content, options);
}

function copyToClipboard(code) {
  navigator.clipboard.writeText(code).then(() => {
    toast("복사 완료", {
      delay: 2e3
    });
  }).catch((err) => {
    toast("복사 실패.. 다시 시도해주세요", {
      delay: 2e3
    });
    console.error(err);
  });
}

function compareTimes(a, b) {
  const dateA = new Date(a);
  const dateB = new Date(b);
  if (dateA > dateB) {
    return -1;
  } else if (dateA < dateB) {
    return 1;
  } else {
    return 0;
  }
}

const Header = ({
  title,
  date,
  categories
}) => {
  return /* @__PURE__ */ jsxs(Wrapper$8, { children: [
    /* @__PURE__ */ jsx("h1", { children: title }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Date$1, { date }),
      /* @__PURE__ */ jsx(Categories, { categories, withLink: true })
    ] })
  ] });
};
const Wrapper$8 = /* @__PURE__ */ _styled("header", process.env.NODE_ENV === "production" ? {
  target: "e16yymsp0"
} : {
  target: "e16yymsp0",
  label: "Wrapper"
})({
  borderBottom: `1px solid ${theme.colors.postCardBorder}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginTop: "80px",
  fontSize: "2rem",
  width: "100%",
  h1: {
    color: theme.colors.text,
    fontWeight: 600,
    fontSize: "2rem",
    marginBottom: "6px"
  },
  div: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    fontSize: "1.1rem",
    fontWeight: 500,
    lineHeight: "1.5",
    marginBottom: "5px",
    gap: "8px",
    span: {
      color: theme.colors.secondaryText
    },
    "& > *:not(:last-child)": {
      borderRight: `2px solid ${theme.colors.postCardBorder}`,
      paddingRight: "8px"
    }
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvUG9zdHMvSGVhZGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQmdCIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvUG9zdHMvSGVhZGVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcclxuaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEhlYWRlclByb3BzIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXInO1xyXG5pbXBvcnQgeyB0aGVtZSB9IGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi90aGVtZSc7XHJcbmltcG9ydCB7IENhdGVnb3JpZXMsIERhdGUgfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24nO1xyXG5cclxuZXhwb3J0IGNvbnN0IEhlYWRlcjogRnVuY3Rpb25Db21wb25lbnQ8SGVhZGVyUHJvcHM+ID0gKHtcclxuXHR0aXRsZSxcclxuXHRkYXRlLFxyXG5cdGNhdGVnb3JpZXMsXHJcbn0pID0+IHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PFdyYXBwZXI+XHJcblx0XHRcdDxoMT57dGl0bGV9PC9oMT5cclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8RGF0ZSBkYXRlPXtkYXRlfSAvPlxyXG5cdFx0XHRcdDxDYXRlZ29yaWVzIGNhdGVnb3JpZXM9e2NhdGVnb3JpZXN9IHdpdGhMaW5rIC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9XcmFwcGVyPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmhlYWRlcih7XHJcblx0Ym9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuY29sb3JzLnBvc3RDYXJkQm9yZGVyfWAsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRtYXJnaW5Ub3A6ICc4MHB4JyxcclxuXHRmb250U2l6ZTogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblxyXG5cdGgxOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRmb250U2l6ZTogJzJyZW0nLFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnNnB4JyxcclxuXHR9LFxyXG5cclxuXHRkaXY6IHtcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0ZmxleFdyYXA6ICd3cmFwJyxcclxuXHRcdGZvbnRTaXplOiAnMS4xcmVtJyxcclxuXHRcdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjUnLFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnNXB4JyxcclxuXHRcdGdhcDogJzhweCcsXHJcblxyXG5cdFx0c3Bhbjoge1xyXG5cdFx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnNlY29uZGFyeVRleHQsXHJcblx0XHR9LFxyXG5cclxuXHRcdCcmID4gKjpub3QoOmxhc3QtY2hpbGQpJzoge1xyXG5cdFx0XHRib3JkZXJSaWdodDogYDJweCBzb2xpZCAke3RoZW1lLmNvbG9ycy5wb3N0Q2FyZEJvcmRlcn1gLFxyXG5cdFx0XHRwYWRkaW5nUmlnaHQ6ICc4cHgnLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxuIl19 */");

function _EMOTION_STRINGIFIED_CSS_ERROR__$8() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const Navigationbar = ({
  categories
}) => {
  return /* @__PURE__ */ jsxs(Navigation$1, { children: [
    /* @__PURE__ */ jsx(StyledLink$1, { to: "/posts", end: true, children: /* @__PURE__ */ jsx(CustomButton, { children: "ALL" }) }),
    categories.map((category) => /* @__PURE__ */ jsx(StyledLink$1, { to: `/posts/${category}`, children: /* @__PURE__ */ jsx(CustomButton, { children: category.toUpperCase() }) }, category))
  ] });
};
const Navigation$1 = /* @__PURE__ */ _styled("nav", process.env.NODE_ENV === "production" ? {
  target: "e17n8tf1"
} : {
  target: "e17n8tf1",
  label: "Navigation"
})(process.env.NODE_ENV === "production" ? {
  name: "6hycoj",
  styles: "display:flex;align-items:center;justify-content:flex-start;flex-wrap:nowrap;gap:7px"
} : {
  name: "6hycoj",
  styles: "display:flex;align-items:center;justify-content:flex-start;flex-wrap:nowrap;gap:7px",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvUG9zdHMvTmF2aWdhdGlvbmJhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0JtQiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL1Bvc3RzL05hdmlnYXRpb25iYXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vdGhlbWUnO1xyXG5pbXBvcnQgZVN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBCdXR0b24sIHN0eWxlZCB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5pbnRlcmZhY2UgTmF2aWdhdGlvbmJhclByb3BzIHtcclxuXHRjYXRlZ29yaWVzOiBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE5hdmlnYXRpb25iYXIgPSAoeyBjYXRlZ29yaWVzIH06IE5hdmlnYXRpb25iYXJQcm9wcykgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8TmF2aWdhdGlvbj5cclxuXHRcdFx0PFN0eWxlZExpbmsgdG89XCIvcG9zdHNcIiBlbmQ+XHJcblx0XHRcdFx0PEN1c3RvbUJ1dHRvbj5BTEw8L0N1c3RvbUJ1dHRvbj5cclxuXHRcdFx0PC9TdHlsZWRMaW5rPlxyXG5cdFx0XHR7Y2F0ZWdvcmllcy5tYXAoKGNhdGVnb3J5KSA9PiAoXHJcblx0XHRcdFx0PFN0eWxlZExpbmsgdG89e2AvcG9zdHMvJHtjYXRlZ29yeX1gfSBrZXk9e2NhdGVnb3J5fT5cclxuXHRcdFx0XHRcdDxDdXN0b21CdXR0b24+e2NhdGVnb3J5LnRvVXBwZXJDYXNlKCl9PC9DdXN0b21CdXR0b24+XHJcblx0XHRcdFx0PC9TdHlsZWRMaW5rPlxyXG5cdFx0XHQpKX1cclxuXHRcdDwvTmF2aWdhdGlvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgTmF2aWdhdGlvbiA9IGVTdHlsZWQubmF2KHtcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JyxcclxuXHRmbGV4V3JhcDogJ25vd3JhcCcsXHJcblx0Z2FwOiAnN3B4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21CdXR0b24gPSBzdHlsZWQoQnV0dG9uKSh7XHJcblx0Y29sb3I6IHRoZW1lLmNvbG9ycy50YWJUZXh0LFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHJcblx0JyY6aG92ZXInOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9ycy5hYm91dExpbmtJY29uSG92ZXIsXHJcblx0fSxcclxufSk7XHJcblxyXG5jb25zdCBTdHlsZWRMaW5rID0gZVN0eWxlZChOYXZMaW5rKSh7XHJcblx0JyYuYWN0aXZlID4gYnV0dG9uJzoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMudGFiU2VsZWN0ZWRCYWNrZ3JvdW5kLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy50YWJTZWxlY3RlZCxcclxuXHR9LFxyXG59KTtcclxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$8
});
const CustomButton = styled(Button$2)({
  color: theme.colors.tabText,
  fontWeight: 700,
  "&:hover": {
    backgroundColor: theme.colors.aboutLinkIconHover
  }
});
const StyledLink$1 = /* @__PURE__ */ _styled(NavLink, process.env.NODE_ENV === "production" ? {
  target: "e17n8tf0"
} : {
  target: "e17n8tf0",
  label: "StyledLink"
})({
  "&.active > button": {
    backgroundColor: theme.colors.tabSelectedBackground,
    color: theme.colors.tabSelected
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvUG9zdHMvTmF2aWdhdGlvbmJhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUNtQiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL1Bvc3RzL05hdmlnYXRpb25iYXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vdGhlbWUnO1xyXG5pbXBvcnQgZVN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBCdXR0b24sIHN0eWxlZCB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5pbnRlcmZhY2UgTmF2aWdhdGlvbmJhclByb3BzIHtcclxuXHRjYXRlZ29yaWVzOiBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE5hdmlnYXRpb25iYXIgPSAoeyBjYXRlZ29yaWVzIH06IE5hdmlnYXRpb25iYXJQcm9wcykgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8TmF2aWdhdGlvbj5cclxuXHRcdFx0PFN0eWxlZExpbmsgdG89XCIvcG9zdHNcIiBlbmQ+XHJcblx0XHRcdFx0PEN1c3RvbUJ1dHRvbj5BTEw8L0N1c3RvbUJ1dHRvbj5cclxuXHRcdFx0PC9TdHlsZWRMaW5rPlxyXG5cdFx0XHR7Y2F0ZWdvcmllcy5tYXAoKGNhdGVnb3J5KSA9PiAoXHJcblx0XHRcdFx0PFN0eWxlZExpbmsgdG89e2AvcG9zdHMvJHtjYXRlZ29yeX1gfSBrZXk9e2NhdGVnb3J5fT5cclxuXHRcdFx0XHRcdDxDdXN0b21CdXR0b24+e2NhdGVnb3J5LnRvVXBwZXJDYXNlKCl9PC9DdXN0b21CdXR0b24+XHJcblx0XHRcdFx0PC9TdHlsZWRMaW5rPlxyXG5cdFx0XHQpKX1cclxuXHRcdDwvTmF2aWdhdGlvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgTmF2aWdhdGlvbiA9IGVTdHlsZWQubmF2KHtcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JyxcclxuXHRmbGV4V3JhcDogJ25vd3JhcCcsXHJcblx0Z2FwOiAnN3B4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21CdXR0b24gPSBzdHlsZWQoQnV0dG9uKSh7XHJcblx0Y29sb3I6IHRoZW1lLmNvbG9ycy50YWJUZXh0LFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHJcblx0JyY6aG92ZXInOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9ycy5hYm91dExpbmtJY29uSG92ZXIsXHJcblx0fSxcclxufSk7XHJcblxyXG5jb25zdCBTdHlsZWRMaW5rID0gZVN0eWxlZChOYXZMaW5rKSh7XHJcblx0JyYuYWN0aXZlID4gYnV0dG9uJzoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMudGFiU2VsZWN0ZWRCYWNrZ3JvdW5kLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy50YWJTZWxlY3RlZCxcclxuXHR9LFxyXG59KTtcclxuIl19 */");

function _EMOTION_STRINGIFIED_CSS_ERROR__$7() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const ellipsis = process.env.NODE_ENV === "production" ? {
  name: "1ad1ypi",
  styles: "-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;line-height:20px;overflow:hidden;text-overflow:ellipsis"
} : {
  name: "164hnpf-ellipsis",
  styles: "-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;line-height:20px;overflow:hidden;text-overflow:ellipsis;label:ellipsis;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvc3R5bGVzL2VsbGlwc2lzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUUyQiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL3N0eWxlcy9lbGxpcHNpcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBlbGxpcHNpcyA9IGNzc2BcclxuXHQtd2Via2l0LWxpbmUtY2xhbXA6IDM7XHJcblx0LXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcclxuXHRkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuXHRsaW5lLWhlaWdodDogMjBweDtcclxuXHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG5gO1xyXG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$7
};

function _EMOTION_STRINGIFIED_CSS_ERROR__$6() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const PostList = ({
  files
}) => {
  const {
    category
  } = useParams();
  const filteredFiles = files.filter(({
    file
  }) => {
    if (!category)
      return true;
    const {
      data
    } = matter(file);
    if (data.categories.includes(category))
      return true;
    return false;
  });
  return /* @__PURE__ */ jsx(Wrapper$7, { children: filteredFiles.map(({
    file,
    key
  }) => {
    const {
      data
    } = matter(file);
    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: `/${key}`, state: {
      markdown: file,
      data
    }, children: [
      /* @__PURE__ */ jsx(PostTitle, { children: data.title }),
      /* @__PURE__ */ jsx(PostContet, { children: data.summary }),
      /* @__PURE__ */ jsxs(PostInfoWrapper, { children: [
        /* @__PURE__ */ jsx(Date$1, { date: data.date }),
        /* @__PURE__ */ jsx(Categories, { categories: data.categories })
      ] })
    ] }) }, key);
  }) });
};
const Wrapper$7 = /* @__PURE__ */ _styled("ul", process.env.NODE_ENV === "production" ? {
  target: "e4kn4h53"
} : {
  target: "e4kn4h53",
  label: "Wrapper"
})({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  "& > li": {
    border: `1px solid ${theme.colors.postCardBorder}`,
    borderRadius: "6px",
    color: theme.colors.text,
    padding: "15px",
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.colors.primary,
      "& p:first-of-type": {
        textDecoration: "underline"
      }
    }
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvUG9zdHMvUG9zdExpc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZDZ0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9Qb3N0cy9Qb3N0TGlzdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0aGVtZSB9IGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi90aGVtZSc7XHJcbmltcG9ydCB7IGVsbGlwc2lzIH0gZnJvbSAnQGNvbXBvbmVudHMvc3R5bGVzL2VsbGlwc2lzJztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBMaW5rLCB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCB7IEN1c3RvbUdyYXlNYXR0ZXJGaWxlIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBDYXRlZ29yaWVzLCBEYXRlIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uJztcclxuaW1wb3J0IHsgTWRGaWxlIH0gZnJvbSAndHlwZXMnO1xyXG5cclxuaW50ZXJmYWNlIFBvc3RMaXN0UHJvcHMge1xyXG5cdGZpbGVzOiBNZEZpbGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFBvc3RMaXN0ID0gKHsgZmlsZXMgfTogUG9zdExpc3RQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY2F0ZWdvcnkgfSA9IHVzZVBhcmFtcygpO1xyXG5cclxuXHRjb25zdCBmaWx0ZXJlZEZpbGVzID0gZmlsZXMuZmlsdGVyKCh7IGZpbGUgfSkgPT4ge1xyXG5cdFx0aWYgKCFjYXRlZ29yeSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIoZmlsZSkgYXMgQ3VzdG9tR3JheU1hdHRlckZpbGU7XHJcblx0XHRpZiAoZGF0YS5jYXRlZ29yaWVzLmluY2x1ZGVzKGNhdGVnb3J5KSkgcmV0dXJuIHRydWU7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0e2ZpbHRlcmVkRmlsZXMubWFwKCh7IGZpbGUsIGtleSB9KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIoZmlsZSkgYXMgQ3VzdG9tR3JheU1hdHRlckZpbGU7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdDxsaSBrZXk9e2tleX0+XHJcblx0XHRcdFx0XHRcdDxMaW5rIHRvPXtgLyR7a2V5fWB9IHN0YXRlPXt7IG1hcmtkb3duOiBmaWxlLCBkYXRhIH19PlxyXG5cdFx0XHRcdFx0XHRcdDxQb3N0VGl0bGU+e2RhdGEudGl0bGV9PC9Qb3N0VGl0bGU+XHJcblx0XHRcdFx0XHRcdFx0PFBvc3RDb250ZXQ+e2RhdGEuc3VtbWFyeX08L1Bvc3RDb250ZXQ+XHJcblx0XHRcdFx0XHRcdFx0PFBvc3RJbmZvV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdDxEYXRlIGRhdGU9e2RhdGEuZGF0ZX0gLz5cclxuXHRcdFx0XHRcdFx0XHRcdDxDYXRlZ29yaWVzIGNhdGVnb3JpZXM9e2RhdGEuY2F0ZWdvcmllc30gLz5cclxuXHRcdFx0XHRcdFx0XHQ8L1Bvc3RJbmZvV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0PC9MaW5rPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9KX1cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC51bCh7XHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGdhcDogJzEycHgnLFxyXG5cclxuXHQnJiA+IGxpJzoge1xyXG5cdFx0Ym9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuY29sb3JzLnBvc3RDYXJkQm9yZGVyfWAsXHJcblx0XHRib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy50ZXh0LFxyXG5cdFx0cGFkZGluZzogJzE1cHgnLFxyXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXHJcblxyXG5cdFx0JyY6aG92ZXInOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHRcdCcmIHA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdFx0XHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zdFRpdGxlID0gc3R5bGVkLnAoe1xyXG5cdGZvbnRTaXplOiAnMS4ycmVtJyxcclxuXHRmb250V2VpZ2h0OiA2MDAsXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zdENvbnRldCA9IHN0eWxlZC5wKFxyXG5cdHtcclxuXHRcdG1hcmdpblRvcDogJzE1cHgnLFxyXG5cdH0sXHJcblx0ZWxsaXBzaXMsXHJcbik7XHJcblxyXG5jb25zdCBQb3N0SW5mb1dyYXBwZXIgPSBzdHlsZWQuZGl2KHtcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmFib3V0TGlua0ljb24sXHJcblx0bWFyZ2luVG9wOiAnMTdweCcsXHJcblx0Zm9udFNpemU6ICcuOHJlbScsXHJcbn0pO1xyXG4iXX0= */");
const PostTitle = /* @__PURE__ */ _styled("p", process.env.NODE_ENV === "production" ? {
  target: "e4kn4h52"
} : {
  target: "e4kn4h52",
  label: "PostTitle"
})(process.env.NODE_ENV === "production" ? {
  name: "1j7m7n5",
  styles: "font-size:1.2rem;font-weight:600"
} : {
  name: "1j7m7n5",
  styles: "font-size:1.2rem;font-weight:600",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvUG9zdHMvUG9zdExpc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1Fa0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9Qb3N0cy9Qb3N0TGlzdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0aGVtZSB9IGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi90aGVtZSc7XHJcbmltcG9ydCB7IGVsbGlwc2lzIH0gZnJvbSAnQGNvbXBvbmVudHMvc3R5bGVzL2VsbGlwc2lzJztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBMaW5rLCB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCB7IEN1c3RvbUdyYXlNYXR0ZXJGaWxlIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBDYXRlZ29yaWVzLCBEYXRlIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uJztcclxuaW1wb3J0IHsgTWRGaWxlIH0gZnJvbSAndHlwZXMnO1xyXG5cclxuaW50ZXJmYWNlIFBvc3RMaXN0UHJvcHMge1xyXG5cdGZpbGVzOiBNZEZpbGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFBvc3RMaXN0ID0gKHsgZmlsZXMgfTogUG9zdExpc3RQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY2F0ZWdvcnkgfSA9IHVzZVBhcmFtcygpO1xyXG5cclxuXHRjb25zdCBmaWx0ZXJlZEZpbGVzID0gZmlsZXMuZmlsdGVyKCh7IGZpbGUgfSkgPT4ge1xyXG5cdFx0aWYgKCFjYXRlZ29yeSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIoZmlsZSkgYXMgQ3VzdG9tR3JheU1hdHRlckZpbGU7XHJcblx0XHRpZiAoZGF0YS5jYXRlZ29yaWVzLmluY2x1ZGVzKGNhdGVnb3J5KSkgcmV0dXJuIHRydWU7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0e2ZpbHRlcmVkRmlsZXMubWFwKCh7IGZpbGUsIGtleSB9KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIoZmlsZSkgYXMgQ3VzdG9tR3JheU1hdHRlckZpbGU7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdDxsaSBrZXk9e2tleX0+XHJcblx0XHRcdFx0XHRcdDxMaW5rIHRvPXtgLyR7a2V5fWB9IHN0YXRlPXt7IG1hcmtkb3duOiBmaWxlLCBkYXRhIH19PlxyXG5cdFx0XHRcdFx0XHRcdDxQb3N0VGl0bGU+e2RhdGEudGl0bGV9PC9Qb3N0VGl0bGU+XHJcblx0XHRcdFx0XHRcdFx0PFBvc3RDb250ZXQ+e2RhdGEuc3VtbWFyeX08L1Bvc3RDb250ZXQ+XHJcblx0XHRcdFx0XHRcdFx0PFBvc3RJbmZvV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdDxEYXRlIGRhdGU9e2RhdGEuZGF0ZX0gLz5cclxuXHRcdFx0XHRcdFx0XHRcdDxDYXRlZ29yaWVzIGNhdGVnb3JpZXM9e2RhdGEuY2F0ZWdvcmllc30gLz5cclxuXHRcdFx0XHRcdFx0XHQ8L1Bvc3RJbmZvV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0PC9MaW5rPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9KX1cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC51bCh7XHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGdhcDogJzEycHgnLFxyXG5cclxuXHQnJiA+IGxpJzoge1xyXG5cdFx0Ym9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuY29sb3JzLnBvc3RDYXJkQm9yZGVyfWAsXHJcblx0XHRib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy50ZXh0LFxyXG5cdFx0cGFkZGluZzogJzE1cHgnLFxyXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXHJcblxyXG5cdFx0JyY6aG92ZXInOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHRcdCcmIHA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdFx0XHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zdFRpdGxlID0gc3R5bGVkLnAoe1xyXG5cdGZvbnRTaXplOiAnMS4ycmVtJyxcclxuXHRmb250V2VpZ2h0OiA2MDAsXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zdENvbnRldCA9IHN0eWxlZC5wKFxyXG5cdHtcclxuXHRcdG1hcmdpblRvcDogJzE1cHgnLFxyXG5cdH0sXHJcblx0ZWxsaXBzaXMsXHJcbik7XHJcblxyXG5jb25zdCBQb3N0SW5mb1dyYXBwZXIgPSBzdHlsZWQuZGl2KHtcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmFib3V0TGlua0ljb24sXHJcblx0bWFyZ2luVG9wOiAnMTdweCcsXHJcblx0Zm9udFNpemU6ICcuOHJlbScsXHJcbn0pO1xyXG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$6
});
const PostContet = /* @__PURE__ */ _styled("p", process.env.NODE_ENV === "production" ? {
  target: "e4kn4h51"
} : {
  target: "e4kn4h51",
  label: "PostContet"
})("margin-top:15px;", ellipsis, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvUG9zdHMvUG9zdExpc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdFbUIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9Qb3N0cy9Qb3N0TGlzdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0aGVtZSB9IGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi90aGVtZSc7XHJcbmltcG9ydCB7IGVsbGlwc2lzIH0gZnJvbSAnQGNvbXBvbmVudHMvc3R5bGVzL2VsbGlwc2lzJztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBMaW5rLCB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCB7IEN1c3RvbUdyYXlNYXR0ZXJGaWxlIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBDYXRlZ29yaWVzLCBEYXRlIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uJztcclxuaW1wb3J0IHsgTWRGaWxlIH0gZnJvbSAndHlwZXMnO1xyXG5cclxuaW50ZXJmYWNlIFBvc3RMaXN0UHJvcHMge1xyXG5cdGZpbGVzOiBNZEZpbGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFBvc3RMaXN0ID0gKHsgZmlsZXMgfTogUG9zdExpc3RQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY2F0ZWdvcnkgfSA9IHVzZVBhcmFtcygpO1xyXG5cclxuXHRjb25zdCBmaWx0ZXJlZEZpbGVzID0gZmlsZXMuZmlsdGVyKCh7IGZpbGUgfSkgPT4ge1xyXG5cdFx0aWYgKCFjYXRlZ29yeSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIoZmlsZSkgYXMgQ3VzdG9tR3JheU1hdHRlckZpbGU7XHJcblx0XHRpZiAoZGF0YS5jYXRlZ29yaWVzLmluY2x1ZGVzKGNhdGVnb3J5KSkgcmV0dXJuIHRydWU7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0e2ZpbHRlcmVkRmlsZXMubWFwKCh7IGZpbGUsIGtleSB9KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIoZmlsZSkgYXMgQ3VzdG9tR3JheU1hdHRlckZpbGU7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdDxsaSBrZXk9e2tleX0+XHJcblx0XHRcdFx0XHRcdDxMaW5rIHRvPXtgLyR7a2V5fWB9IHN0YXRlPXt7IG1hcmtkb3duOiBmaWxlLCBkYXRhIH19PlxyXG5cdFx0XHRcdFx0XHRcdDxQb3N0VGl0bGU+e2RhdGEudGl0bGV9PC9Qb3N0VGl0bGU+XHJcblx0XHRcdFx0XHRcdFx0PFBvc3RDb250ZXQ+e2RhdGEuc3VtbWFyeX08L1Bvc3RDb250ZXQ+XHJcblx0XHRcdFx0XHRcdFx0PFBvc3RJbmZvV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdDxEYXRlIGRhdGU9e2RhdGEuZGF0ZX0gLz5cclxuXHRcdFx0XHRcdFx0XHRcdDxDYXRlZ29yaWVzIGNhdGVnb3JpZXM9e2RhdGEuY2F0ZWdvcmllc30gLz5cclxuXHRcdFx0XHRcdFx0XHQ8L1Bvc3RJbmZvV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0PC9MaW5rPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9KX1cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC51bCh7XHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGdhcDogJzEycHgnLFxyXG5cclxuXHQnJiA+IGxpJzoge1xyXG5cdFx0Ym9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuY29sb3JzLnBvc3RDYXJkQm9yZGVyfWAsXHJcblx0XHRib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy50ZXh0LFxyXG5cdFx0cGFkZGluZzogJzE1cHgnLFxyXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXHJcblxyXG5cdFx0JyY6aG92ZXInOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHRcdCcmIHA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdFx0XHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zdFRpdGxlID0gc3R5bGVkLnAoe1xyXG5cdGZvbnRTaXplOiAnMS4ycmVtJyxcclxuXHRmb250V2VpZ2h0OiA2MDAsXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zdENvbnRldCA9IHN0eWxlZC5wKFxyXG5cdHtcclxuXHRcdG1hcmdpblRvcDogJzE1cHgnLFxyXG5cdH0sXHJcblx0ZWxsaXBzaXMsXHJcbik7XHJcblxyXG5jb25zdCBQb3N0SW5mb1dyYXBwZXIgPSBzdHlsZWQuZGl2KHtcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmFib3V0TGlua0ljb24sXHJcblx0bWFyZ2luVG9wOiAnMTdweCcsXHJcblx0Zm9udFNpemU6ICcuOHJlbScsXHJcbn0pO1xyXG4iXX0= */");
const PostInfoWrapper = /* @__PURE__ */ _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e4kn4h50"
} : {
  target: "e4kn4h50",
  label: "PostInfoWrapper"
})({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: theme.colors.aboutLinkIcon,
  marginTop: "17px",
  fontSize: ".8rem"
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvUG9zdHMvUG9zdExpc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStFd0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9Qb3N0cy9Qb3N0TGlzdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0aGVtZSB9IGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi90aGVtZSc7XHJcbmltcG9ydCB7IGVsbGlwc2lzIH0gZnJvbSAnQGNvbXBvbmVudHMvc3R5bGVzL2VsbGlwc2lzJztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBMaW5rLCB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCB7IEN1c3RvbUdyYXlNYXR0ZXJGaWxlIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBDYXRlZ29yaWVzLCBEYXRlIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uJztcclxuaW1wb3J0IHsgTWRGaWxlIH0gZnJvbSAndHlwZXMnO1xyXG5cclxuaW50ZXJmYWNlIFBvc3RMaXN0UHJvcHMge1xyXG5cdGZpbGVzOiBNZEZpbGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFBvc3RMaXN0ID0gKHsgZmlsZXMgfTogUG9zdExpc3RQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY2F0ZWdvcnkgfSA9IHVzZVBhcmFtcygpO1xyXG5cclxuXHRjb25zdCBmaWx0ZXJlZEZpbGVzID0gZmlsZXMuZmlsdGVyKCh7IGZpbGUgfSkgPT4ge1xyXG5cdFx0aWYgKCFjYXRlZ29yeSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIoZmlsZSkgYXMgQ3VzdG9tR3JheU1hdHRlckZpbGU7XHJcblx0XHRpZiAoZGF0YS5jYXRlZ29yaWVzLmluY2x1ZGVzKGNhdGVnb3J5KSkgcmV0dXJuIHRydWU7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0e2ZpbHRlcmVkRmlsZXMubWFwKCh7IGZpbGUsIGtleSB9KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIoZmlsZSkgYXMgQ3VzdG9tR3JheU1hdHRlckZpbGU7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdDxsaSBrZXk9e2tleX0+XHJcblx0XHRcdFx0XHRcdDxMaW5rIHRvPXtgLyR7a2V5fWB9IHN0YXRlPXt7IG1hcmtkb3duOiBmaWxlLCBkYXRhIH19PlxyXG5cdFx0XHRcdFx0XHRcdDxQb3N0VGl0bGU+e2RhdGEudGl0bGV9PC9Qb3N0VGl0bGU+XHJcblx0XHRcdFx0XHRcdFx0PFBvc3RDb250ZXQ+e2RhdGEuc3VtbWFyeX08L1Bvc3RDb250ZXQ+XHJcblx0XHRcdFx0XHRcdFx0PFBvc3RJbmZvV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdDxEYXRlIGRhdGU9e2RhdGEuZGF0ZX0gLz5cclxuXHRcdFx0XHRcdFx0XHRcdDxDYXRlZ29yaWVzIGNhdGVnb3JpZXM9e2RhdGEuY2F0ZWdvcmllc30gLz5cclxuXHRcdFx0XHRcdFx0XHQ8L1Bvc3RJbmZvV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0PC9MaW5rPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9KX1cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC51bCh7XHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGdhcDogJzEycHgnLFxyXG5cclxuXHQnJiA+IGxpJzoge1xyXG5cdFx0Ym9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuY29sb3JzLnBvc3RDYXJkQm9yZGVyfWAsXHJcblx0XHRib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy50ZXh0LFxyXG5cdFx0cGFkZGluZzogJzE1cHgnLFxyXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXHJcblxyXG5cdFx0JyY6aG92ZXInOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHRcdCcmIHA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdFx0XHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zdFRpdGxlID0gc3R5bGVkLnAoe1xyXG5cdGZvbnRTaXplOiAnMS4ycmVtJyxcclxuXHRmb250V2VpZ2h0OiA2MDAsXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zdENvbnRldCA9IHN0eWxlZC5wKFxyXG5cdHtcclxuXHRcdG1hcmdpblRvcDogJzE1cHgnLFxyXG5cdH0sXHJcblx0ZWxsaXBzaXMsXHJcbik7XHJcblxyXG5jb25zdCBQb3N0SW5mb1dyYXBwZXIgPSBzdHlsZWQuZGl2KHtcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmFib3V0TGlua0ljb24sXHJcblx0bWFyZ2luVG9wOiAnMTdweCcsXHJcblx0Zm9udFNpemU6ICcuOHJlbScsXHJcbn0pO1xyXG4iXX0= */");

function _EMOTION_STRINGIFIED_CSS_ERROR__$5() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const MarkdownRednerer = ({
  markdown
}) => {
  const {
    content,
    data
  } = matter(markdown);
  const handleClick = (code) => {
    copyToClipboard(code);
  };
  return /* @__PURE__ */ jsxs(Wrapper$6, { children: [
    /* @__PURE__ */ jsx(Header, { ...data }),
    /* @__PURE__ */ jsx(CustomMarkdown, { components: {
      blockquote(props) {
        return /* @__PURE__ */ jsx(BlockQuoteStyle, { ...props });
      },
      ol(props) {
        return /* @__PURE__ */ jsx(OrderedListStyle, { ...props });
      },
      ul(props) {
        return /* @__PURE__ */ jsx(UnOrderedListStyled, { ...props });
      },
      code(props) {
        const {
          children,
          className: lang,
          ...rest
        } = props;
        const match = /language-(\w+)/.exec(lang || "");
        const code = String(children).replace(/\n$/, "");
        return match ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(PasteWrapper, { children: /* @__PURE__ */ jsx(Button$1, { content: "복사하기", onClick: () => handleClick(code) }) }),
          /* @__PURE__ */ jsx(
            CustomSyntaxHighligter,
            {
              style: {},
              useInlineStyles: false,
              language: match[1],
              children: code
            }
          )
        ] }) : /* @__PURE__ */ jsx(CodeStyle, { ...rest, children });
      },
      a(props) {
        return /* @__PURE__ */ jsx(AnchorStyle, { ...props });
      },
      h1(props) {
        return /* @__PURE__ */ jsx(HeadingStyle, { level: 1, ...props });
      },
      h2(props) {
        return /* @__PURE__ */ jsx(HeadingStyle, { level: 2, ...props });
      },
      h3(props) {
        return /* @__PURE__ */ jsx(HeadingStyle, { level: 3, ...props });
      },
      h4(props) {
        return /* @__PURE__ */ jsx(HeadingStyle, { level: 4, ...props });
      },
      h5(props) {
        return /* @__PURE__ */ jsx(HeadingStyle, { level: 5, ...props });
      }
    }, children: content })
  ] });
};
const Wrapper$6 = /* @__PURE__ */ _styled("article", process.env.NODE_ENV === "production" ? {
  target: "e1nl42cg9"
} : {
  target: "e1nl42cg9",
  label: "Wrapper"
})({
  color: theme.colors.contentText,
  width: "100%",
  maxWidth: "720px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: "1.6",
  gap: "24px"
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdIZ0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vTWFya2Rvd25SZW5kZXJlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBtYXR0ZXIsIHsgR3JheU1hdHRlckZpbGUgfSBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCAnZGF5anMvbG9jYWxlL2VuJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9Qb3N0cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4nO1xyXG5cclxudHlwZSBNYXJrZG93blJlZG5lcmVyUHJvcHMgPSB7XHJcblx0bWFya2Rvd246ICcqLm1kJztcclxufTtcclxuXHJcbnR5cGUgSGVhZGluZ0xldmVscyA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcclxuXHJcbmV4cG9ydCB0eXBlIEhlYWRlclByb3BzID0ge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHN1bW1hcnk6IHN0cmluZztcclxuXHRhdXRob3I6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEN1c3RvbUdyYXlNYXR0ZXJGaWxlID0gR3JheU1hdHRlckZpbGU8XHJcblx0TWFya2Rvd25SZWRuZXJlclByb3BzWydtYXJrZG93biddXHJcbj4gJiB7XHJcblx0ZGF0YTogSGVhZGVyUHJvcHM7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQ29kZVByb3BzXHJcblx0ZXh0ZW5kcyBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcclxuXHRcdFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PixcclxuXHRcdEhUTUxFbGVtZW50XHJcblx0PiB7XHJcblx0Y2xhc3NOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWFya2Rvd25SZWRuZXJlciA9ICh7IG1hcmtkb3duIH06IE1hcmtkb3duUmVkbmVyZXJQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1hcmtkb3duKSBhcyBDdXN0b21HcmF5TWF0dGVyRmlsZTtcclxuXHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoY29kZTogc3RyaW5nKSA9PiB7XHJcblx0XHRjb3B5VG9DbGlwYm9hcmQoY29kZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxXcmFwcGVyPlxyXG5cdFx0XHQ8SGVhZGVyIHsuLi5kYXRhfSAvPlxyXG5cdFx0XHQ8Q3VzdG9tTWFya2Rvd25cclxuXHRcdFx0XHRjb21wb25lbnRzPXt7XHJcblx0XHRcdFx0XHRibG9ja3F1b3RlKHByb3BzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8QmxvY2tRdW90ZVN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2wocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxPcmRlcmVkTGlzdFN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWwocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxVbk9yZGVyZWRMaXN0U3R5bGVkIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29kZShwcm9wczogQ29kZVByb3BzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZTogbGFuZywgLi4ucmVzdCB9ID0gcHJvcHM7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gL2xhbmd1YWdlLShcXHcrKS8uZXhlYyhsYW5nIHx8ICcnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZSA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtYXRjaCA/IChcclxuXHRcdFx0XHRcdFx0XHQ8PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFBhc3RlV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9XCLrs7XsgqztlZjquLBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGNvZGUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9QYXN0ZVdyYXBwZXI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Q3VzdG9tU3ludGF4SGlnaGxpZ3RlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e319XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUlubGluZVN0eWxlcz17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhbmd1YWdlPXttYXRjaFsxXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gd3JhcExvbmdMaW5lc1xyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7Y29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvQ3VzdG9tU3ludGF4SGlnaGxpZ3Rlcj5cclxuXHRcdFx0XHRcdFx0XHQ8Lz5cclxuXHRcdFx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFx0XHQ8Q29kZVN0eWxlIHsuLi5yZXN0fT57Y2hpbGRyZW59PC9Db2RlU3R5bGU+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YShwcm9wcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFuY2hvclN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDEocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezF9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDIocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezJ9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDMocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezN9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDQocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezR9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDUocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezV9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9DdXN0b21NYXJrZG93bj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5hcnRpY2xlKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmNvbnRlbnRUZXh0LFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0bWF4V2lkdGg6ICc3MjBweCcsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS42JyxcclxuXHRnYXA6ICcyNHB4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21NYXJrZG93biA9IHN0eWxlZChNYXJrZG93bikoe1xyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRnYXA6ICcxcmVtJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS41JyxcclxuXHJcblx0JyYgPiA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdG1hcmdpblRvcDogMCxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHByZSc6IHtcclxuXHRcdG1hcmdpbjogJzM1cHggYXV0bycsXHJcblxyXG5cdFx0JyYgPiBwcmUnOiB7XHJcblx0XHRcdG1hcmdpbjogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0JyYgcHJlJzoge1xyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdH0sXHJcblxyXG5cdCdwIGVtJzoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0J2Jsb2NrcXVvdGUsIGRldGFpbHMsIGRsLCBpbCwgcCwgcHJlLCB1bCc6IHtcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjYnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUGFzdGVXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0aGVpZ2h0OiAnMzBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblxyXG5cdCcmOjphZnRlcic6IHtcclxuXHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0YmFja2dyb3VuZDogJyNmYzYyNWQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRcdGJveFNoYWRvdzogJzIwcHggMCAjZmRiYzQwLCA0MHB4IDAgIzM1Y2Q0YicsXHJcblx0XHRoZWlnaHQ6ICcxMnB4JyxcclxuXHRcdGxlZnQ6ICcxMnB4JyxcclxuXHRcdHRvcDogJzlweCcsXHJcblx0XHR3aWR0aDogJzEycHgnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgQ3VzdG9tU3ludGF4SGlnaGxpZ3RlciA9IHN0eWxlZChTeW50YXhIaWdobGlnaHRlcikoe1xyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdHBhZGRpbmc6ICcyNXB4JyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdG92ZXJmbG93OiAnYXV0bycsXHJcbn0pO1xyXG5cclxuY29uc3QgQmxvY2tRdW90ZVN0eWxlID0gc3R5bGVkLmJsb2NrcXVvdGUoe1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJsb2NrcXVvdGVCYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckxlZnQ6IGAuMjVyZW0gc29saWQgJHt0aGVtZS5jb2xvcnMucHJpbWFyeX1gLFxyXG5cdHBhZGRpbmc6ICcuNXJlbSAxcmVtJyxcclxufSk7XHJcblxyXG5jb25zdCBPcmRlcmVkTGlzdFN0eWxlID0gc3R5bGVkLm9sKHtcclxuXHRsaXN0U3R5bGVUeXBlOiAnbnVtYmVyJyxcclxuXHRwYWRkaW5nTGVmdDogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcbn0pO1xyXG5cclxuY29uc3QgVW5PcmRlcmVkTGlzdFN0eWxlZCA9IHN0eWxlZC51bCh7XHJcblx0bGlzdFN0eWxlVHlwZTogJ2Rpc2MnLFxyXG5cdHBhZGRpbmdMZWZ0OiAnMnJlbScsXHJcblx0d2lkdGg6ICcxMDAlJyxcclxufSk7XHJcblxyXG5jb25zdCBDb2RlU3R5bGUgPSBzdHlsZWQuY29kZSh7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbkhvdmVyLFxyXG5cdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0Zm9udFNpemU6ICcuODVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRwYWRkaW5nOiAnLjJyZW0gLjRyZW0nLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvclN0eWxlID0gc3R5bGVkLmEoe1xyXG5cdGJvcmRlckJvdHRvbTogJy4wNXJlbSBzb2xpZCcsXHJcblx0Ym9yZGVyQm90dG9tQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxufSk7XHJcblxyXG5jb25zdCBnZXRIZWFkaW5nU3R5bGUgPSAobGV2ZWw6IEhlYWRpbmdMZXZlbHMpID0+IHtcclxuXHRzd2l0Y2ggKGxldmVsKSB7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdHJldHVybiAnMi41ZW0nOyAvLyBoMeyXkCDtlbTri7ntlZjripQg7Iqk7YOA7J28XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdHJldHVybiAnMmVtJzsgLy8gaDLsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRyZXR1cm4gJzEuNWVtJzsgLy8gaDPsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICcxZW0nOyAvLyDquLDrs7jqsJJcclxuXHR9XHJcbn07XHJcblxyXG50eXBlIEhlYWRpbmdQcm9wcyA9IHtcclxuXHRsZXZlbDogSGVhZGluZ0xldmVscztcclxufTtcclxuXHJcbmNvbnN0IEhlYWRpbmdTdHlsZSA9IHN0eWxlZC5oZ3JvdXA8SGVhZGluZ1Byb3BzPihcclxuXHR7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS4yNScsXHJcblx0XHRtYXJnaW5Ub3A6ICc0MHB4JyxcclxuXHRcdGFsaWduU2VsZjogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0KHsgbGV2ZWwgfSkgPT4gKHtcclxuXHRcdGZvbnRTaXplOiBnZXRIZWFkaW5nU3R5bGUobGV2ZWwpLFxyXG5cdH0pLFxyXG4pO1xyXG4iXX0= */");
const CustomMarkdown = /* @__PURE__ */ _styled(Markdown, process.env.NODE_ENV === "production" ? {
  target: "e1nl42cg8"
} : {
  target: "e1nl42cg8",
  label: "CustomMarkdown"
})(process.env.NODE_ENV === "production" ? {
  name: "oonhsr",
  styles: "width:100%;display:flex;flex-direction:column;justify-content:center;gap:1rem;line-height:1.5;& > :first-of-type{margin-top:0;}& > pre{margin:35px auto;& > pre{margin:0;}}& pre{max-width:100%;display:inline-block;}p em{display:block;text-align:center;}blockquote, details, dl, il, p, pre, ul{line-height:1.6;}"
} : {
  name: "oonhsr",
  styles: "width:100%;display:flex;flex-direction:column;justify-content:center;gap:1rem;line-height:1.5;& > :first-of-type{margin-top:0;}& > pre{margin:35px auto;& > pre{margin:0;}}& pre{max-width:100%;display:inline-block;}p em{display:block;text-align:center;}blockquote, details, dl, il, p, pre, ul{line-height:1.6;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRIdUIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vTWFya2Rvd25SZW5kZXJlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBtYXR0ZXIsIHsgR3JheU1hdHRlckZpbGUgfSBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCAnZGF5anMvbG9jYWxlL2VuJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9Qb3N0cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4nO1xyXG5cclxudHlwZSBNYXJrZG93blJlZG5lcmVyUHJvcHMgPSB7XHJcblx0bWFya2Rvd246ICcqLm1kJztcclxufTtcclxuXHJcbnR5cGUgSGVhZGluZ0xldmVscyA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcclxuXHJcbmV4cG9ydCB0eXBlIEhlYWRlclByb3BzID0ge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHN1bW1hcnk6IHN0cmluZztcclxuXHRhdXRob3I6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEN1c3RvbUdyYXlNYXR0ZXJGaWxlID0gR3JheU1hdHRlckZpbGU8XHJcblx0TWFya2Rvd25SZWRuZXJlclByb3BzWydtYXJrZG93biddXHJcbj4gJiB7XHJcblx0ZGF0YTogSGVhZGVyUHJvcHM7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQ29kZVByb3BzXHJcblx0ZXh0ZW5kcyBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcclxuXHRcdFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PixcclxuXHRcdEhUTUxFbGVtZW50XHJcblx0PiB7XHJcblx0Y2xhc3NOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWFya2Rvd25SZWRuZXJlciA9ICh7IG1hcmtkb3duIH06IE1hcmtkb3duUmVkbmVyZXJQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1hcmtkb3duKSBhcyBDdXN0b21HcmF5TWF0dGVyRmlsZTtcclxuXHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoY29kZTogc3RyaW5nKSA9PiB7XHJcblx0XHRjb3B5VG9DbGlwYm9hcmQoY29kZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxXcmFwcGVyPlxyXG5cdFx0XHQ8SGVhZGVyIHsuLi5kYXRhfSAvPlxyXG5cdFx0XHQ8Q3VzdG9tTWFya2Rvd25cclxuXHRcdFx0XHRjb21wb25lbnRzPXt7XHJcblx0XHRcdFx0XHRibG9ja3F1b3RlKHByb3BzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8QmxvY2tRdW90ZVN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2wocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxPcmRlcmVkTGlzdFN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWwocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxVbk9yZGVyZWRMaXN0U3R5bGVkIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29kZShwcm9wczogQ29kZVByb3BzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZTogbGFuZywgLi4ucmVzdCB9ID0gcHJvcHM7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gL2xhbmd1YWdlLShcXHcrKS8uZXhlYyhsYW5nIHx8ICcnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZSA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtYXRjaCA/IChcclxuXHRcdFx0XHRcdFx0XHQ8PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFBhc3RlV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9XCLrs7XsgqztlZjquLBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGNvZGUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9QYXN0ZVdyYXBwZXI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Q3VzdG9tU3ludGF4SGlnaGxpZ3RlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e319XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUlubGluZVN0eWxlcz17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhbmd1YWdlPXttYXRjaFsxXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gd3JhcExvbmdMaW5lc1xyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7Y29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvQ3VzdG9tU3ludGF4SGlnaGxpZ3Rlcj5cclxuXHRcdFx0XHRcdFx0XHQ8Lz5cclxuXHRcdFx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFx0XHQ8Q29kZVN0eWxlIHsuLi5yZXN0fT57Y2hpbGRyZW59PC9Db2RlU3R5bGU+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YShwcm9wcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFuY2hvclN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDEocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezF9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDIocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezJ9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDMocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezN9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDQocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezR9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDUocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezV9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9DdXN0b21NYXJrZG93bj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5hcnRpY2xlKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmNvbnRlbnRUZXh0LFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0bWF4V2lkdGg6ICc3MjBweCcsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS42JyxcclxuXHRnYXA6ICcyNHB4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21NYXJrZG93biA9IHN0eWxlZChNYXJrZG93bikoe1xyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRnYXA6ICcxcmVtJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS41JyxcclxuXHJcblx0JyYgPiA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdG1hcmdpblRvcDogMCxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHByZSc6IHtcclxuXHRcdG1hcmdpbjogJzM1cHggYXV0bycsXHJcblxyXG5cdFx0JyYgPiBwcmUnOiB7XHJcblx0XHRcdG1hcmdpbjogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0JyYgcHJlJzoge1xyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdH0sXHJcblxyXG5cdCdwIGVtJzoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0J2Jsb2NrcXVvdGUsIGRldGFpbHMsIGRsLCBpbCwgcCwgcHJlLCB1bCc6IHtcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjYnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUGFzdGVXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0aGVpZ2h0OiAnMzBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblxyXG5cdCcmOjphZnRlcic6IHtcclxuXHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0YmFja2dyb3VuZDogJyNmYzYyNWQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRcdGJveFNoYWRvdzogJzIwcHggMCAjZmRiYzQwLCA0MHB4IDAgIzM1Y2Q0YicsXHJcblx0XHRoZWlnaHQ6ICcxMnB4JyxcclxuXHRcdGxlZnQ6ICcxMnB4JyxcclxuXHRcdHRvcDogJzlweCcsXHJcblx0XHR3aWR0aDogJzEycHgnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgQ3VzdG9tU3ludGF4SGlnaGxpZ3RlciA9IHN0eWxlZChTeW50YXhIaWdobGlnaHRlcikoe1xyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdHBhZGRpbmc6ICcyNXB4JyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdG92ZXJmbG93OiAnYXV0bycsXHJcbn0pO1xyXG5cclxuY29uc3QgQmxvY2tRdW90ZVN0eWxlID0gc3R5bGVkLmJsb2NrcXVvdGUoe1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJsb2NrcXVvdGVCYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckxlZnQ6IGAuMjVyZW0gc29saWQgJHt0aGVtZS5jb2xvcnMucHJpbWFyeX1gLFxyXG5cdHBhZGRpbmc6ICcuNXJlbSAxcmVtJyxcclxufSk7XHJcblxyXG5jb25zdCBPcmRlcmVkTGlzdFN0eWxlID0gc3R5bGVkLm9sKHtcclxuXHRsaXN0U3R5bGVUeXBlOiAnbnVtYmVyJyxcclxuXHRwYWRkaW5nTGVmdDogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcbn0pO1xyXG5cclxuY29uc3QgVW5PcmRlcmVkTGlzdFN0eWxlZCA9IHN0eWxlZC51bCh7XHJcblx0bGlzdFN0eWxlVHlwZTogJ2Rpc2MnLFxyXG5cdHBhZGRpbmdMZWZ0OiAnMnJlbScsXHJcblx0d2lkdGg6ICcxMDAlJyxcclxufSk7XHJcblxyXG5jb25zdCBDb2RlU3R5bGUgPSBzdHlsZWQuY29kZSh7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbkhvdmVyLFxyXG5cdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0Zm9udFNpemU6ICcuODVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRwYWRkaW5nOiAnLjJyZW0gLjRyZW0nLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvclN0eWxlID0gc3R5bGVkLmEoe1xyXG5cdGJvcmRlckJvdHRvbTogJy4wNXJlbSBzb2xpZCcsXHJcblx0Ym9yZGVyQm90dG9tQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxufSk7XHJcblxyXG5jb25zdCBnZXRIZWFkaW5nU3R5bGUgPSAobGV2ZWw6IEhlYWRpbmdMZXZlbHMpID0+IHtcclxuXHRzd2l0Y2ggKGxldmVsKSB7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdHJldHVybiAnMi41ZW0nOyAvLyBoMeyXkCDtlbTri7ntlZjripQg7Iqk7YOA7J28XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdHJldHVybiAnMmVtJzsgLy8gaDLsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRyZXR1cm4gJzEuNWVtJzsgLy8gaDPsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICcxZW0nOyAvLyDquLDrs7jqsJJcclxuXHR9XHJcbn07XHJcblxyXG50eXBlIEhlYWRpbmdQcm9wcyA9IHtcclxuXHRsZXZlbDogSGVhZGluZ0xldmVscztcclxufTtcclxuXHJcbmNvbnN0IEhlYWRpbmdTdHlsZSA9IHN0eWxlZC5oZ3JvdXA8SGVhZGluZ1Byb3BzPihcclxuXHR7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS4yNScsXHJcblx0XHRtYXJnaW5Ub3A6ICc0MHB4JyxcclxuXHRcdGFsaWduU2VsZjogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0KHsgbGV2ZWwgfSkgPT4gKHtcclxuXHRcdGZvbnRTaXplOiBnZXRIZWFkaW5nU3R5bGUobGV2ZWwpLFxyXG5cdH0pLFxyXG4pO1xyXG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$5
});
const PasteWrapper = /* @__PURE__ */ _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e1nl42cg7"
} : {
  target: "e1nl42cg7",
  label: "PasteWrapper"
})({
  position: "relative",
  height: "30px",
  backgroundColor: theme.colors.background2,
  "&::after": {
    content: '""',
    position: "absolute",
    background: "#fc625d",
    borderRadius: "50%",
    boxShadow: "20px 0 #fdbc40, 40px 0 #35cd4b",
    height: "12px",
    left: "12px",
    top: "9px",
    width: "12px"
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStKcUIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vTWFya2Rvd25SZW5kZXJlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBtYXR0ZXIsIHsgR3JheU1hdHRlckZpbGUgfSBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCAnZGF5anMvbG9jYWxlL2VuJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9Qb3N0cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4nO1xyXG5cclxudHlwZSBNYXJrZG93blJlZG5lcmVyUHJvcHMgPSB7XHJcblx0bWFya2Rvd246ICcqLm1kJztcclxufTtcclxuXHJcbnR5cGUgSGVhZGluZ0xldmVscyA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcclxuXHJcbmV4cG9ydCB0eXBlIEhlYWRlclByb3BzID0ge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHN1bW1hcnk6IHN0cmluZztcclxuXHRhdXRob3I6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEN1c3RvbUdyYXlNYXR0ZXJGaWxlID0gR3JheU1hdHRlckZpbGU8XHJcblx0TWFya2Rvd25SZWRuZXJlclByb3BzWydtYXJrZG93biddXHJcbj4gJiB7XHJcblx0ZGF0YTogSGVhZGVyUHJvcHM7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQ29kZVByb3BzXHJcblx0ZXh0ZW5kcyBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcclxuXHRcdFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PixcclxuXHRcdEhUTUxFbGVtZW50XHJcblx0PiB7XHJcblx0Y2xhc3NOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWFya2Rvd25SZWRuZXJlciA9ICh7IG1hcmtkb3duIH06IE1hcmtkb3duUmVkbmVyZXJQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1hcmtkb3duKSBhcyBDdXN0b21HcmF5TWF0dGVyRmlsZTtcclxuXHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoY29kZTogc3RyaW5nKSA9PiB7XHJcblx0XHRjb3B5VG9DbGlwYm9hcmQoY29kZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxXcmFwcGVyPlxyXG5cdFx0XHQ8SGVhZGVyIHsuLi5kYXRhfSAvPlxyXG5cdFx0XHQ8Q3VzdG9tTWFya2Rvd25cclxuXHRcdFx0XHRjb21wb25lbnRzPXt7XHJcblx0XHRcdFx0XHRibG9ja3F1b3RlKHByb3BzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8QmxvY2tRdW90ZVN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2wocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxPcmRlcmVkTGlzdFN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWwocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxVbk9yZGVyZWRMaXN0U3R5bGVkIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29kZShwcm9wczogQ29kZVByb3BzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZTogbGFuZywgLi4ucmVzdCB9ID0gcHJvcHM7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gL2xhbmd1YWdlLShcXHcrKS8uZXhlYyhsYW5nIHx8ICcnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZSA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtYXRjaCA/IChcclxuXHRcdFx0XHRcdFx0XHQ8PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFBhc3RlV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9XCLrs7XsgqztlZjquLBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGNvZGUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9QYXN0ZVdyYXBwZXI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Q3VzdG9tU3ludGF4SGlnaGxpZ3RlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e319XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUlubGluZVN0eWxlcz17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhbmd1YWdlPXttYXRjaFsxXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gd3JhcExvbmdMaW5lc1xyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7Y29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvQ3VzdG9tU3ludGF4SGlnaGxpZ3Rlcj5cclxuXHRcdFx0XHRcdFx0XHQ8Lz5cclxuXHRcdFx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFx0XHQ8Q29kZVN0eWxlIHsuLi5yZXN0fT57Y2hpbGRyZW59PC9Db2RlU3R5bGU+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YShwcm9wcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFuY2hvclN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDEocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezF9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDIocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezJ9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDMocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezN9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDQocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezR9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDUocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezV9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9DdXN0b21NYXJrZG93bj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5hcnRpY2xlKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmNvbnRlbnRUZXh0LFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0bWF4V2lkdGg6ICc3MjBweCcsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS42JyxcclxuXHRnYXA6ICcyNHB4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21NYXJrZG93biA9IHN0eWxlZChNYXJrZG93bikoe1xyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRnYXA6ICcxcmVtJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS41JyxcclxuXHJcblx0JyYgPiA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdG1hcmdpblRvcDogMCxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHByZSc6IHtcclxuXHRcdG1hcmdpbjogJzM1cHggYXV0bycsXHJcblxyXG5cdFx0JyYgPiBwcmUnOiB7XHJcblx0XHRcdG1hcmdpbjogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0JyYgcHJlJzoge1xyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdH0sXHJcblxyXG5cdCdwIGVtJzoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0J2Jsb2NrcXVvdGUsIGRldGFpbHMsIGRsLCBpbCwgcCwgcHJlLCB1bCc6IHtcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjYnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUGFzdGVXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0aGVpZ2h0OiAnMzBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblxyXG5cdCcmOjphZnRlcic6IHtcclxuXHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0YmFja2dyb3VuZDogJyNmYzYyNWQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRcdGJveFNoYWRvdzogJzIwcHggMCAjZmRiYzQwLCA0MHB4IDAgIzM1Y2Q0YicsXHJcblx0XHRoZWlnaHQ6ICcxMnB4JyxcclxuXHRcdGxlZnQ6ICcxMnB4JyxcclxuXHRcdHRvcDogJzlweCcsXHJcblx0XHR3aWR0aDogJzEycHgnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgQ3VzdG9tU3ludGF4SGlnaGxpZ3RlciA9IHN0eWxlZChTeW50YXhIaWdobGlnaHRlcikoe1xyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdHBhZGRpbmc6ICcyNXB4JyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdG92ZXJmbG93OiAnYXV0bycsXHJcbn0pO1xyXG5cclxuY29uc3QgQmxvY2tRdW90ZVN0eWxlID0gc3R5bGVkLmJsb2NrcXVvdGUoe1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJsb2NrcXVvdGVCYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckxlZnQ6IGAuMjVyZW0gc29saWQgJHt0aGVtZS5jb2xvcnMucHJpbWFyeX1gLFxyXG5cdHBhZGRpbmc6ICcuNXJlbSAxcmVtJyxcclxufSk7XHJcblxyXG5jb25zdCBPcmRlcmVkTGlzdFN0eWxlID0gc3R5bGVkLm9sKHtcclxuXHRsaXN0U3R5bGVUeXBlOiAnbnVtYmVyJyxcclxuXHRwYWRkaW5nTGVmdDogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcbn0pO1xyXG5cclxuY29uc3QgVW5PcmRlcmVkTGlzdFN0eWxlZCA9IHN0eWxlZC51bCh7XHJcblx0bGlzdFN0eWxlVHlwZTogJ2Rpc2MnLFxyXG5cdHBhZGRpbmdMZWZ0OiAnMnJlbScsXHJcblx0d2lkdGg6ICcxMDAlJyxcclxufSk7XHJcblxyXG5jb25zdCBDb2RlU3R5bGUgPSBzdHlsZWQuY29kZSh7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbkhvdmVyLFxyXG5cdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0Zm9udFNpemU6ICcuODVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRwYWRkaW5nOiAnLjJyZW0gLjRyZW0nLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvclN0eWxlID0gc3R5bGVkLmEoe1xyXG5cdGJvcmRlckJvdHRvbTogJy4wNXJlbSBzb2xpZCcsXHJcblx0Ym9yZGVyQm90dG9tQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxufSk7XHJcblxyXG5jb25zdCBnZXRIZWFkaW5nU3R5bGUgPSAobGV2ZWw6IEhlYWRpbmdMZXZlbHMpID0+IHtcclxuXHRzd2l0Y2ggKGxldmVsKSB7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdHJldHVybiAnMi41ZW0nOyAvLyBoMeyXkCDtlbTri7ntlZjripQg7Iqk7YOA7J28XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdHJldHVybiAnMmVtJzsgLy8gaDLsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRyZXR1cm4gJzEuNWVtJzsgLy8gaDPsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICcxZW0nOyAvLyDquLDrs7jqsJJcclxuXHR9XHJcbn07XHJcblxyXG50eXBlIEhlYWRpbmdQcm9wcyA9IHtcclxuXHRsZXZlbDogSGVhZGluZ0xldmVscztcclxufTtcclxuXHJcbmNvbnN0IEhlYWRpbmdTdHlsZSA9IHN0eWxlZC5oZ3JvdXA8SGVhZGluZ1Byb3BzPihcclxuXHR7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS4yNScsXHJcblx0XHRtYXJnaW5Ub3A6ICc0MHB4JyxcclxuXHRcdGFsaWduU2VsZjogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0KHsgbGV2ZWwgfSkgPT4gKHtcclxuXHRcdGZvbnRTaXplOiBnZXRIZWFkaW5nU3R5bGUobGV2ZWwpLFxyXG5cdH0pLFxyXG4pO1xyXG4iXX0= */");
const CustomSyntaxHighligter = /* @__PURE__ */ _styled(Prism, process.env.NODE_ENV === "production" ? {
  target: "e1nl42cg6"
} : {
  target: "e1nl42cg6",
  label: "CustomSyntaxHighligter"
})(process.env.NODE_ENV === "production" ? {
  name: "1sg6cya",
  styles: "position:relative;padding:25px;font-weight:500;background-color:transparent;overflow:auto"
} : {
  name: "1sg6cya",
  styles: "position:relative;padding:25px;font-weight:500;background-color:transparent;overflow:auto",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlMK0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vTWFya2Rvd25SZW5kZXJlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBtYXR0ZXIsIHsgR3JheU1hdHRlckZpbGUgfSBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCAnZGF5anMvbG9jYWxlL2VuJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9Qb3N0cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4nO1xyXG5cclxudHlwZSBNYXJrZG93blJlZG5lcmVyUHJvcHMgPSB7XHJcblx0bWFya2Rvd246ICcqLm1kJztcclxufTtcclxuXHJcbnR5cGUgSGVhZGluZ0xldmVscyA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcclxuXHJcbmV4cG9ydCB0eXBlIEhlYWRlclByb3BzID0ge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHN1bW1hcnk6IHN0cmluZztcclxuXHRhdXRob3I6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEN1c3RvbUdyYXlNYXR0ZXJGaWxlID0gR3JheU1hdHRlckZpbGU8XHJcblx0TWFya2Rvd25SZWRuZXJlclByb3BzWydtYXJrZG93biddXHJcbj4gJiB7XHJcblx0ZGF0YTogSGVhZGVyUHJvcHM7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQ29kZVByb3BzXHJcblx0ZXh0ZW5kcyBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcclxuXHRcdFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PixcclxuXHRcdEhUTUxFbGVtZW50XHJcblx0PiB7XHJcblx0Y2xhc3NOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWFya2Rvd25SZWRuZXJlciA9ICh7IG1hcmtkb3duIH06IE1hcmtkb3duUmVkbmVyZXJQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1hcmtkb3duKSBhcyBDdXN0b21HcmF5TWF0dGVyRmlsZTtcclxuXHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoY29kZTogc3RyaW5nKSA9PiB7XHJcblx0XHRjb3B5VG9DbGlwYm9hcmQoY29kZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxXcmFwcGVyPlxyXG5cdFx0XHQ8SGVhZGVyIHsuLi5kYXRhfSAvPlxyXG5cdFx0XHQ8Q3VzdG9tTWFya2Rvd25cclxuXHRcdFx0XHRjb21wb25lbnRzPXt7XHJcblx0XHRcdFx0XHRibG9ja3F1b3RlKHByb3BzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8QmxvY2tRdW90ZVN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2wocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxPcmRlcmVkTGlzdFN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWwocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxVbk9yZGVyZWRMaXN0U3R5bGVkIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29kZShwcm9wczogQ29kZVByb3BzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZTogbGFuZywgLi4ucmVzdCB9ID0gcHJvcHM7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gL2xhbmd1YWdlLShcXHcrKS8uZXhlYyhsYW5nIHx8ICcnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZSA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtYXRjaCA/IChcclxuXHRcdFx0XHRcdFx0XHQ8PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFBhc3RlV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9XCLrs7XsgqztlZjquLBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGNvZGUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9QYXN0ZVdyYXBwZXI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Q3VzdG9tU3ludGF4SGlnaGxpZ3RlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e319XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUlubGluZVN0eWxlcz17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhbmd1YWdlPXttYXRjaFsxXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gd3JhcExvbmdMaW5lc1xyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7Y29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvQ3VzdG9tU3ludGF4SGlnaGxpZ3Rlcj5cclxuXHRcdFx0XHRcdFx0XHQ8Lz5cclxuXHRcdFx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFx0XHQ8Q29kZVN0eWxlIHsuLi5yZXN0fT57Y2hpbGRyZW59PC9Db2RlU3R5bGU+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YShwcm9wcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFuY2hvclN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDEocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezF9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDIocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezJ9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDMocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezN9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDQocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezR9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDUocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezV9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9DdXN0b21NYXJrZG93bj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5hcnRpY2xlKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmNvbnRlbnRUZXh0LFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0bWF4V2lkdGg6ICc3MjBweCcsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS42JyxcclxuXHRnYXA6ICcyNHB4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21NYXJrZG93biA9IHN0eWxlZChNYXJrZG93bikoe1xyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRnYXA6ICcxcmVtJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS41JyxcclxuXHJcblx0JyYgPiA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdG1hcmdpblRvcDogMCxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHByZSc6IHtcclxuXHRcdG1hcmdpbjogJzM1cHggYXV0bycsXHJcblxyXG5cdFx0JyYgPiBwcmUnOiB7XHJcblx0XHRcdG1hcmdpbjogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0JyYgcHJlJzoge1xyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdH0sXHJcblxyXG5cdCdwIGVtJzoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0J2Jsb2NrcXVvdGUsIGRldGFpbHMsIGRsLCBpbCwgcCwgcHJlLCB1bCc6IHtcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjYnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUGFzdGVXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0aGVpZ2h0OiAnMzBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblxyXG5cdCcmOjphZnRlcic6IHtcclxuXHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0YmFja2dyb3VuZDogJyNmYzYyNWQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRcdGJveFNoYWRvdzogJzIwcHggMCAjZmRiYzQwLCA0MHB4IDAgIzM1Y2Q0YicsXHJcblx0XHRoZWlnaHQ6ICcxMnB4JyxcclxuXHRcdGxlZnQ6ICcxMnB4JyxcclxuXHRcdHRvcDogJzlweCcsXHJcblx0XHR3aWR0aDogJzEycHgnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgQ3VzdG9tU3ludGF4SGlnaGxpZ3RlciA9IHN0eWxlZChTeW50YXhIaWdobGlnaHRlcikoe1xyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdHBhZGRpbmc6ICcyNXB4JyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdG92ZXJmbG93OiAnYXV0bycsXHJcbn0pO1xyXG5cclxuY29uc3QgQmxvY2tRdW90ZVN0eWxlID0gc3R5bGVkLmJsb2NrcXVvdGUoe1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJsb2NrcXVvdGVCYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckxlZnQ6IGAuMjVyZW0gc29saWQgJHt0aGVtZS5jb2xvcnMucHJpbWFyeX1gLFxyXG5cdHBhZGRpbmc6ICcuNXJlbSAxcmVtJyxcclxufSk7XHJcblxyXG5jb25zdCBPcmRlcmVkTGlzdFN0eWxlID0gc3R5bGVkLm9sKHtcclxuXHRsaXN0U3R5bGVUeXBlOiAnbnVtYmVyJyxcclxuXHRwYWRkaW5nTGVmdDogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcbn0pO1xyXG5cclxuY29uc3QgVW5PcmRlcmVkTGlzdFN0eWxlZCA9IHN0eWxlZC51bCh7XHJcblx0bGlzdFN0eWxlVHlwZTogJ2Rpc2MnLFxyXG5cdHBhZGRpbmdMZWZ0OiAnMnJlbScsXHJcblx0d2lkdGg6ICcxMDAlJyxcclxufSk7XHJcblxyXG5jb25zdCBDb2RlU3R5bGUgPSBzdHlsZWQuY29kZSh7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbkhvdmVyLFxyXG5cdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0Zm9udFNpemU6ICcuODVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRwYWRkaW5nOiAnLjJyZW0gLjRyZW0nLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvclN0eWxlID0gc3R5bGVkLmEoe1xyXG5cdGJvcmRlckJvdHRvbTogJy4wNXJlbSBzb2xpZCcsXHJcblx0Ym9yZGVyQm90dG9tQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxufSk7XHJcblxyXG5jb25zdCBnZXRIZWFkaW5nU3R5bGUgPSAobGV2ZWw6IEhlYWRpbmdMZXZlbHMpID0+IHtcclxuXHRzd2l0Y2ggKGxldmVsKSB7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdHJldHVybiAnMi41ZW0nOyAvLyBoMeyXkCDtlbTri7ntlZjripQg7Iqk7YOA7J28XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdHJldHVybiAnMmVtJzsgLy8gaDLsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRyZXR1cm4gJzEuNWVtJzsgLy8gaDPsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICcxZW0nOyAvLyDquLDrs7jqsJJcclxuXHR9XHJcbn07XHJcblxyXG50eXBlIEhlYWRpbmdQcm9wcyA9IHtcclxuXHRsZXZlbDogSGVhZGluZ0xldmVscztcclxufTtcclxuXHJcbmNvbnN0IEhlYWRpbmdTdHlsZSA9IHN0eWxlZC5oZ3JvdXA8SGVhZGluZ1Byb3BzPihcclxuXHR7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS4yNScsXHJcblx0XHRtYXJnaW5Ub3A6ICc0MHB4JyxcclxuXHRcdGFsaWduU2VsZjogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0KHsgbGV2ZWwgfSkgPT4gKHtcclxuXHRcdGZvbnRTaXplOiBnZXRIZWFkaW5nU3R5bGUobGV2ZWwpLFxyXG5cdH0pLFxyXG4pO1xyXG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$5
});
const BlockQuoteStyle = /* @__PURE__ */ _styled("blockquote", process.env.NODE_ENV === "production" ? {
  target: "e1nl42cg5"
} : {
  target: "e1nl42cg5",
  label: "BlockQuoteStyle"
})({
  backgroundColor: theme.colors.blockquoteBackground,
  borderLeft: `.25rem solid ${theme.colors.primary}`,
  padding: ".5rem 1rem"
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlMd0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vTWFya2Rvd25SZW5kZXJlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBtYXR0ZXIsIHsgR3JheU1hdHRlckZpbGUgfSBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCAnZGF5anMvbG9jYWxlL2VuJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9Qb3N0cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4nO1xyXG5cclxudHlwZSBNYXJrZG93blJlZG5lcmVyUHJvcHMgPSB7XHJcblx0bWFya2Rvd246ICcqLm1kJztcclxufTtcclxuXHJcbnR5cGUgSGVhZGluZ0xldmVscyA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcclxuXHJcbmV4cG9ydCB0eXBlIEhlYWRlclByb3BzID0ge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHN1bW1hcnk6IHN0cmluZztcclxuXHRhdXRob3I6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEN1c3RvbUdyYXlNYXR0ZXJGaWxlID0gR3JheU1hdHRlckZpbGU8XHJcblx0TWFya2Rvd25SZWRuZXJlclByb3BzWydtYXJrZG93biddXHJcbj4gJiB7XHJcblx0ZGF0YTogSGVhZGVyUHJvcHM7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQ29kZVByb3BzXHJcblx0ZXh0ZW5kcyBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcclxuXHRcdFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PixcclxuXHRcdEhUTUxFbGVtZW50XHJcblx0PiB7XHJcblx0Y2xhc3NOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWFya2Rvd25SZWRuZXJlciA9ICh7IG1hcmtkb3duIH06IE1hcmtkb3duUmVkbmVyZXJQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1hcmtkb3duKSBhcyBDdXN0b21HcmF5TWF0dGVyRmlsZTtcclxuXHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoY29kZTogc3RyaW5nKSA9PiB7XHJcblx0XHRjb3B5VG9DbGlwYm9hcmQoY29kZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxXcmFwcGVyPlxyXG5cdFx0XHQ8SGVhZGVyIHsuLi5kYXRhfSAvPlxyXG5cdFx0XHQ8Q3VzdG9tTWFya2Rvd25cclxuXHRcdFx0XHRjb21wb25lbnRzPXt7XHJcblx0XHRcdFx0XHRibG9ja3F1b3RlKHByb3BzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8QmxvY2tRdW90ZVN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2wocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxPcmRlcmVkTGlzdFN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWwocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxVbk9yZGVyZWRMaXN0U3R5bGVkIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29kZShwcm9wczogQ29kZVByb3BzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZTogbGFuZywgLi4ucmVzdCB9ID0gcHJvcHM7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gL2xhbmd1YWdlLShcXHcrKS8uZXhlYyhsYW5nIHx8ICcnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZSA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtYXRjaCA/IChcclxuXHRcdFx0XHRcdFx0XHQ8PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFBhc3RlV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9XCLrs7XsgqztlZjquLBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGNvZGUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9QYXN0ZVdyYXBwZXI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Q3VzdG9tU3ludGF4SGlnaGxpZ3RlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e319XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUlubGluZVN0eWxlcz17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhbmd1YWdlPXttYXRjaFsxXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gd3JhcExvbmdMaW5lc1xyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7Y29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvQ3VzdG9tU3ludGF4SGlnaGxpZ3Rlcj5cclxuXHRcdFx0XHRcdFx0XHQ8Lz5cclxuXHRcdFx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFx0XHQ8Q29kZVN0eWxlIHsuLi5yZXN0fT57Y2hpbGRyZW59PC9Db2RlU3R5bGU+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YShwcm9wcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFuY2hvclN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDEocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezF9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDIocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezJ9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDMocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezN9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDQocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezR9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDUocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezV9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9DdXN0b21NYXJrZG93bj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5hcnRpY2xlKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmNvbnRlbnRUZXh0LFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0bWF4V2lkdGg6ICc3MjBweCcsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS42JyxcclxuXHRnYXA6ICcyNHB4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21NYXJrZG93biA9IHN0eWxlZChNYXJrZG93bikoe1xyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRnYXA6ICcxcmVtJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS41JyxcclxuXHJcblx0JyYgPiA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdG1hcmdpblRvcDogMCxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHByZSc6IHtcclxuXHRcdG1hcmdpbjogJzM1cHggYXV0bycsXHJcblxyXG5cdFx0JyYgPiBwcmUnOiB7XHJcblx0XHRcdG1hcmdpbjogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0JyYgcHJlJzoge1xyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdH0sXHJcblxyXG5cdCdwIGVtJzoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0J2Jsb2NrcXVvdGUsIGRldGFpbHMsIGRsLCBpbCwgcCwgcHJlLCB1bCc6IHtcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjYnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUGFzdGVXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0aGVpZ2h0OiAnMzBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblxyXG5cdCcmOjphZnRlcic6IHtcclxuXHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0YmFja2dyb3VuZDogJyNmYzYyNWQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRcdGJveFNoYWRvdzogJzIwcHggMCAjZmRiYzQwLCA0MHB4IDAgIzM1Y2Q0YicsXHJcblx0XHRoZWlnaHQ6ICcxMnB4JyxcclxuXHRcdGxlZnQ6ICcxMnB4JyxcclxuXHRcdHRvcDogJzlweCcsXHJcblx0XHR3aWR0aDogJzEycHgnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgQ3VzdG9tU3ludGF4SGlnaGxpZ3RlciA9IHN0eWxlZChTeW50YXhIaWdobGlnaHRlcikoe1xyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdHBhZGRpbmc6ICcyNXB4JyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdG92ZXJmbG93OiAnYXV0bycsXHJcbn0pO1xyXG5cclxuY29uc3QgQmxvY2tRdW90ZVN0eWxlID0gc3R5bGVkLmJsb2NrcXVvdGUoe1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJsb2NrcXVvdGVCYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckxlZnQ6IGAuMjVyZW0gc29saWQgJHt0aGVtZS5jb2xvcnMucHJpbWFyeX1gLFxyXG5cdHBhZGRpbmc6ICcuNXJlbSAxcmVtJyxcclxufSk7XHJcblxyXG5jb25zdCBPcmRlcmVkTGlzdFN0eWxlID0gc3R5bGVkLm9sKHtcclxuXHRsaXN0U3R5bGVUeXBlOiAnbnVtYmVyJyxcclxuXHRwYWRkaW5nTGVmdDogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcbn0pO1xyXG5cclxuY29uc3QgVW5PcmRlcmVkTGlzdFN0eWxlZCA9IHN0eWxlZC51bCh7XHJcblx0bGlzdFN0eWxlVHlwZTogJ2Rpc2MnLFxyXG5cdHBhZGRpbmdMZWZ0OiAnMnJlbScsXHJcblx0d2lkdGg6ICcxMDAlJyxcclxufSk7XHJcblxyXG5jb25zdCBDb2RlU3R5bGUgPSBzdHlsZWQuY29kZSh7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbkhvdmVyLFxyXG5cdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0Zm9udFNpemU6ICcuODVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRwYWRkaW5nOiAnLjJyZW0gLjRyZW0nLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvclN0eWxlID0gc3R5bGVkLmEoe1xyXG5cdGJvcmRlckJvdHRvbTogJy4wNXJlbSBzb2xpZCcsXHJcblx0Ym9yZGVyQm90dG9tQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxufSk7XHJcblxyXG5jb25zdCBnZXRIZWFkaW5nU3R5bGUgPSAobGV2ZWw6IEhlYWRpbmdMZXZlbHMpID0+IHtcclxuXHRzd2l0Y2ggKGxldmVsKSB7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdHJldHVybiAnMi41ZW0nOyAvLyBoMeyXkCDtlbTri7ntlZjripQg7Iqk7YOA7J28XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdHJldHVybiAnMmVtJzsgLy8gaDLsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRyZXR1cm4gJzEuNWVtJzsgLy8gaDPsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICcxZW0nOyAvLyDquLDrs7jqsJJcclxuXHR9XHJcbn07XHJcblxyXG50eXBlIEhlYWRpbmdQcm9wcyA9IHtcclxuXHRsZXZlbDogSGVhZGluZ0xldmVscztcclxufTtcclxuXHJcbmNvbnN0IEhlYWRpbmdTdHlsZSA9IHN0eWxlZC5oZ3JvdXA8SGVhZGluZ1Byb3BzPihcclxuXHR7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS4yNScsXHJcblx0XHRtYXJnaW5Ub3A6ICc0MHB4JyxcclxuXHRcdGFsaWduU2VsZjogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0KHsgbGV2ZWwgfSkgPT4gKHtcclxuXHRcdGZvbnRTaXplOiBnZXRIZWFkaW5nU3R5bGUobGV2ZWwpLFxyXG5cdH0pLFxyXG4pO1xyXG4iXX0= */");
const OrderedListStyle = /* @__PURE__ */ _styled("ol", process.env.NODE_ENV === "production" ? {
  target: "e1nl42cg4"
} : {
  target: "e1nl42cg4",
  label: "OrderedListStyle"
})(process.env.NODE_ENV === "production" ? {
  name: "z39df4",
  styles: "list-style-type:number;padding-left:2rem;width:100%"
} : {
  name: "z39df4",
  styles: "list-style-type:number;padding-left:2rem;width:100%",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStMeUIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vTWFya2Rvd25SZW5kZXJlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBtYXR0ZXIsIHsgR3JheU1hdHRlckZpbGUgfSBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCAnZGF5anMvbG9jYWxlL2VuJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9Qb3N0cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4nO1xyXG5cclxudHlwZSBNYXJrZG93blJlZG5lcmVyUHJvcHMgPSB7XHJcblx0bWFya2Rvd246ICcqLm1kJztcclxufTtcclxuXHJcbnR5cGUgSGVhZGluZ0xldmVscyA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcclxuXHJcbmV4cG9ydCB0eXBlIEhlYWRlclByb3BzID0ge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHN1bW1hcnk6IHN0cmluZztcclxuXHRhdXRob3I6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEN1c3RvbUdyYXlNYXR0ZXJGaWxlID0gR3JheU1hdHRlckZpbGU8XHJcblx0TWFya2Rvd25SZWRuZXJlclByb3BzWydtYXJrZG93biddXHJcbj4gJiB7XHJcblx0ZGF0YTogSGVhZGVyUHJvcHM7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQ29kZVByb3BzXHJcblx0ZXh0ZW5kcyBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcclxuXHRcdFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PixcclxuXHRcdEhUTUxFbGVtZW50XHJcblx0PiB7XHJcblx0Y2xhc3NOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWFya2Rvd25SZWRuZXJlciA9ICh7IG1hcmtkb3duIH06IE1hcmtkb3duUmVkbmVyZXJQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1hcmtkb3duKSBhcyBDdXN0b21HcmF5TWF0dGVyRmlsZTtcclxuXHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoY29kZTogc3RyaW5nKSA9PiB7XHJcblx0XHRjb3B5VG9DbGlwYm9hcmQoY29kZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxXcmFwcGVyPlxyXG5cdFx0XHQ8SGVhZGVyIHsuLi5kYXRhfSAvPlxyXG5cdFx0XHQ8Q3VzdG9tTWFya2Rvd25cclxuXHRcdFx0XHRjb21wb25lbnRzPXt7XHJcblx0XHRcdFx0XHRibG9ja3F1b3RlKHByb3BzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8QmxvY2tRdW90ZVN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2wocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxPcmRlcmVkTGlzdFN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWwocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxVbk9yZGVyZWRMaXN0U3R5bGVkIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29kZShwcm9wczogQ29kZVByb3BzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZTogbGFuZywgLi4ucmVzdCB9ID0gcHJvcHM7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gL2xhbmd1YWdlLShcXHcrKS8uZXhlYyhsYW5nIHx8ICcnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZSA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtYXRjaCA/IChcclxuXHRcdFx0XHRcdFx0XHQ8PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFBhc3RlV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9XCLrs7XsgqztlZjquLBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGNvZGUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9QYXN0ZVdyYXBwZXI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Q3VzdG9tU3ludGF4SGlnaGxpZ3RlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e319XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUlubGluZVN0eWxlcz17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhbmd1YWdlPXttYXRjaFsxXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gd3JhcExvbmdMaW5lc1xyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7Y29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvQ3VzdG9tU3ludGF4SGlnaGxpZ3Rlcj5cclxuXHRcdFx0XHRcdFx0XHQ8Lz5cclxuXHRcdFx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFx0XHQ8Q29kZVN0eWxlIHsuLi5yZXN0fT57Y2hpbGRyZW59PC9Db2RlU3R5bGU+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YShwcm9wcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFuY2hvclN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDEocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezF9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDIocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezJ9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDMocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezN9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDQocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezR9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDUocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezV9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9DdXN0b21NYXJrZG93bj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5hcnRpY2xlKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmNvbnRlbnRUZXh0LFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0bWF4V2lkdGg6ICc3MjBweCcsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS42JyxcclxuXHRnYXA6ICcyNHB4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21NYXJrZG93biA9IHN0eWxlZChNYXJrZG93bikoe1xyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRnYXA6ICcxcmVtJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS41JyxcclxuXHJcblx0JyYgPiA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdG1hcmdpblRvcDogMCxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHByZSc6IHtcclxuXHRcdG1hcmdpbjogJzM1cHggYXV0bycsXHJcblxyXG5cdFx0JyYgPiBwcmUnOiB7XHJcblx0XHRcdG1hcmdpbjogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0JyYgcHJlJzoge1xyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdH0sXHJcblxyXG5cdCdwIGVtJzoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0J2Jsb2NrcXVvdGUsIGRldGFpbHMsIGRsLCBpbCwgcCwgcHJlLCB1bCc6IHtcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjYnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUGFzdGVXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0aGVpZ2h0OiAnMzBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblxyXG5cdCcmOjphZnRlcic6IHtcclxuXHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0YmFja2dyb3VuZDogJyNmYzYyNWQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRcdGJveFNoYWRvdzogJzIwcHggMCAjZmRiYzQwLCA0MHB4IDAgIzM1Y2Q0YicsXHJcblx0XHRoZWlnaHQ6ICcxMnB4JyxcclxuXHRcdGxlZnQ6ICcxMnB4JyxcclxuXHRcdHRvcDogJzlweCcsXHJcblx0XHR3aWR0aDogJzEycHgnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgQ3VzdG9tU3ludGF4SGlnaGxpZ3RlciA9IHN0eWxlZChTeW50YXhIaWdobGlnaHRlcikoe1xyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdHBhZGRpbmc6ICcyNXB4JyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdG92ZXJmbG93OiAnYXV0bycsXHJcbn0pO1xyXG5cclxuY29uc3QgQmxvY2tRdW90ZVN0eWxlID0gc3R5bGVkLmJsb2NrcXVvdGUoe1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJsb2NrcXVvdGVCYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckxlZnQ6IGAuMjVyZW0gc29saWQgJHt0aGVtZS5jb2xvcnMucHJpbWFyeX1gLFxyXG5cdHBhZGRpbmc6ICcuNXJlbSAxcmVtJyxcclxufSk7XHJcblxyXG5jb25zdCBPcmRlcmVkTGlzdFN0eWxlID0gc3R5bGVkLm9sKHtcclxuXHRsaXN0U3R5bGVUeXBlOiAnbnVtYmVyJyxcclxuXHRwYWRkaW5nTGVmdDogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcbn0pO1xyXG5cclxuY29uc3QgVW5PcmRlcmVkTGlzdFN0eWxlZCA9IHN0eWxlZC51bCh7XHJcblx0bGlzdFN0eWxlVHlwZTogJ2Rpc2MnLFxyXG5cdHBhZGRpbmdMZWZ0OiAnMnJlbScsXHJcblx0d2lkdGg6ICcxMDAlJyxcclxufSk7XHJcblxyXG5jb25zdCBDb2RlU3R5bGUgPSBzdHlsZWQuY29kZSh7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbkhvdmVyLFxyXG5cdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0Zm9udFNpemU6ICcuODVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRwYWRkaW5nOiAnLjJyZW0gLjRyZW0nLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvclN0eWxlID0gc3R5bGVkLmEoe1xyXG5cdGJvcmRlckJvdHRvbTogJy4wNXJlbSBzb2xpZCcsXHJcblx0Ym9yZGVyQm90dG9tQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxufSk7XHJcblxyXG5jb25zdCBnZXRIZWFkaW5nU3R5bGUgPSAobGV2ZWw6IEhlYWRpbmdMZXZlbHMpID0+IHtcclxuXHRzd2l0Y2ggKGxldmVsKSB7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdHJldHVybiAnMi41ZW0nOyAvLyBoMeyXkCDtlbTri7ntlZjripQg7Iqk7YOA7J28XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdHJldHVybiAnMmVtJzsgLy8gaDLsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRyZXR1cm4gJzEuNWVtJzsgLy8gaDPsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICcxZW0nOyAvLyDquLDrs7jqsJJcclxuXHR9XHJcbn07XHJcblxyXG50eXBlIEhlYWRpbmdQcm9wcyA9IHtcclxuXHRsZXZlbDogSGVhZGluZ0xldmVscztcclxufTtcclxuXHJcbmNvbnN0IEhlYWRpbmdTdHlsZSA9IHN0eWxlZC5oZ3JvdXA8SGVhZGluZ1Byb3BzPihcclxuXHR7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS4yNScsXHJcblx0XHRtYXJnaW5Ub3A6ICc0MHB4JyxcclxuXHRcdGFsaWduU2VsZjogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0KHsgbGV2ZWwgfSkgPT4gKHtcclxuXHRcdGZvbnRTaXplOiBnZXRIZWFkaW5nU3R5bGUobGV2ZWwpLFxyXG5cdH0pLFxyXG4pO1xyXG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$5
});
const UnOrderedListStyled = /* @__PURE__ */ _styled("ul", process.env.NODE_ENV === "production" ? {
  target: "e1nl42cg3"
} : {
  target: "e1nl42cg3",
  label: "UnOrderedListStyled"
})(process.env.NODE_ENV === "production" ? {
  name: "sa84lt",
  styles: "list-style-type:disc;padding-left:2rem;width:100%"
} : {
  name: "sa84lt",
  styles: "list-style-type:disc;padding-left:2rem;width:100%",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFNNEIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vTWFya2Rvd25SZW5kZXJlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBtYXR0ZXIsIHsgR3JheU1hdHRlckZpbGUgfSBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCAnZGF5anMvbG9jYWxlL2VuJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9Qb3N0cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4nO1xyXG5cclxudHlwZSBNYXJrZG93blJlZG5lcmVyUHJvcHMgPSB7XHJcblx0bWFya2Rvd246ICcqLm1kJztcclxufTtcclxuXHJcbnR5cGUgSGVhZGluZ0xldmVscyA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcclxuXHJcbmV4cG9ydCB0eXBlIEhlYWRlclByb3BzID0ge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHN1bW1hcnk6IHN0cmluZztcclxuXHRhdXRob3I6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEN1c3RvbUdyYXlNYXR0ZXJGaWxlID0gR3JheU1hdHRlckZpbGU8XHJcblx0TWFya2Rvd25SZWRuZXJlclByb3BzWydtYXJrZG93biddXHJcbj4gJiB7XHJcblx0ZGF0YTogSGVhZGVyUHJvcHM7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQ29kZVByb3BzXHJcblx0ZXh0ZW5kcyBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcclxuXHRcdFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PixcclxuXHRcdEhUTUxFbGVtZW50XHJcblx0PiB7XHJcblx0Y2xhc3NOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWFya2Rvd25SZWRuZXJlciA9ICh7IG1hcmtkb3duIH06IE1hcmtkb3duUmVkbmVyZXJQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1hcmtkb3duKSBhcyBDdXN0b21HcmF5TWF0dGVyRmlsZTtcclxuXHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoY29kZTogc3RyaW5nKSA9PiB7XHJcblx0XHRjb3B5VG9DbGlwYm9hcmQoY29kZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxXcmFwcGVyPlxyXG5cdFx0XHQ8SGVhZGVyIHsuLi5kYXRhfSAvPlxyXG5cdFx0XHQ8Q3VzdG9tTWFya2Rvd25cclxuXHRcdFx0XHRjb21wb25lbnRzPXt7XHJcblx0XHRcdFx0XHRibG9ja3F1b3RlKHByb3BzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8QmxvY2tRdW90ZVN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2wocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxPcmRlcmVkTGlzdFN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWwocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxVbk9yZGVyZWRMaXN0U3R5bGVkIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29kZShwcm9wczogQ29kZVByb3BzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZTogbGFuZywgLi4ucmVzdCB9ID0gcHJvcHM7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gL2xhbmd1YWdlLShcXHcrKS8uZXhlYyhsYW5nIHx8ICcnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZSA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtYXRjaCA/IChcclxuXHRcdFx0XHRcdFx0XHQ8PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFBhc3RlV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9XCLrs7XsgqztlZjquLBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGNvZGUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9QYXN0ZVdyYXBwZXI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Q3VzdG9tU3ludGF4SGlnaGxpZ3RlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e319XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUlubGluZVN0eWxlcz17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhbmd1YWdlPXttYXRjaFsxXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gd3JhcExvbmdMaW5lc1xyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7Y29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvQ3VzdG9tU3ludGF4SGlnaGxpZ3Rlcj5cclxuXHRcdFx0XHRcdFx0XHQ8Lz5cclxuXHRcdFx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFx0XHQ8Q29kZVN0eWxlIHsuLi5yZXN0fT57Y2hpbGRyZW59PC9Db2RlU3R5bGU+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YShwcm9wcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFuY2hvclN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDEocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezF9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDIocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezJ9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDMocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezN9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDQocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezR9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDUocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezV9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9DdXN0b21NYXJrZG93bj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5hcnRpY2xlKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmNvbnRlbnRUZXh0LFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0bWF4V2lkdGg6ICc3MjBweCcsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS42JyxcclxuXHRnYXA6ICcyNHB4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21NYXJrZG93biA9IHN0eWxlZChNYXJrZG93bikoe1xyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRnYXA6ICcxcmVtJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS41JyxcclxuXHJcblx0JyYgPiA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdG1hcmdpblRvcDogMCxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHByZSc6IHtcclxuXHRcdG1hcmdpbjogJzM1cHggYXV0bycsXHJcblxyXG5cdFx0JyYgPiBwcmUnOiB7XHJcblx0XHRcdG1hcmdpbjogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0JyYgcHJlJzoge1xyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdH0sXHJcblxyXG5cdCdwIGVtJzoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0J2Jsb2NrcXVvdGUsIGRldGFpbHMsIGRsLCBpbCwgcCwgcHJlLCB1bCc6IHtcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjYnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUGFzdGVXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0aGVpZ2h0OiAnMzBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblxyXG5cdCcmOjphZnRlcic6IHtcclxuXHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0YmFja2dyb3VuZDogJyNmYzYyNWQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRcdGJveFNoYWRvdzogJzIwcHggMCAjZmRiYzQwLCA0MHB4IDAgIzM1Y2Q0YicsXHJcblx0XHRoZWlnaHQ6ICcxMnB4JyxcclxuXHRcdGxlZnQ6ICcxMnB4JyxcclxuXHRcdHRvcDogJzlweCcsXHJcblx0XHR3aWR0aDogJzEycHgnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgQ3VzdG9tU3ludGF4SGlnaGxpZ3RlciA9IHN0eWxlZChTeW50YXhIaWdobGlnaHRlcikoe1xyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdHBhZGRpbmc6ICcyNXB4JyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdG92ZXJmbG93OiAnYXV0bycsXHJcbn0pO1xyXG5cclxuY29uc3QgQmxvY2tRdW90ZVN0eWxlID0gc3R5bGVkLmJsb2NrcXVvdGUoe1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJsb2NrcXVvdGVCYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckxlZnQ6IGAuMjVyZW0gc29saWQgJHt0aGVtZS5jb2xvcnMucHJpbWFyeX1gLFxyXG5cdHBhZGRpbmc6ICcuNXJlbSAxcmVtJyxcclxufSk7XHJcblxyXG5jb25zdCBPcmRlcmVkTGlzdFN0eWxlID0gc3R5bGVkLm9sKHtcclxuXHRsaXN0U3R5bGVUeXBlOiAnbnVtYmVyJyxcclxuXHRwYWRkaW5nTGVmdDogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcbn0pO1xyXG5cclxuY29uc3QgVW5PcmRlcmVkTGlzdFN0eWxlZCA9IHN0eWxlZC51bCh7XHJcblx0bGlzdFN0eWxlVHlwZTogJ2Rpc2MnLFxyXG5cdHBhZGRpbmdMZWZ0OiAnMnJlbScsXHJcblx0d2lkdGg6ICcxMDAlJyxcclxufSk7XHJcblxyXG5jb25zdCBDb2RlU3R5bGUgPSBzdHlsZWQuY29kZSh7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbkhvdmVyLFxyXG5cdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0Zm9udFNpemU6ICcuODVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRwYWRkaW5nOiAnLjJyZW0gLjRyZW0nLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvclN0eWxlID0gc3R5bGVkLmEoe1xyXG5cdGJvcmRlckJvdHRvbTogJy4wNXJlbSBzb2xpZCcsXHJcblx0Ym9yZGVyQm90dG9tQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxufSk7XHJcblxyXG5jb25zdCBnZXRIZWFkaW5nU3R5bGUgPSAobGV2ZWw6IEhlYWRpbmdMZXZlbHMpID0+IHtcclxuXHRzd2l0Y2ggKGxldmVsKSB7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdHJldHVybiAnMi41ZW0nOyAvLyBoMeyXkCDtlbTri7ntlZjripQg7Iqk7YOA7J28XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdHJldHVybiAnMmVtJzsgLy8gaDLsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRyZXR1cm4gJzEuNWVtJzsgLy8gaDPsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICcxZW0nOyAvLyDquLDrs7jqsJJcclxuXHR9XHJcbn07XHJcblxyXG50eXBlIEhlYWRpbmdQcm9wcyA9IHtcclxuXHRsZXZlbDogSGVhZGluZ0xldmVscztcclxufTtcclxuXHJcbmNvbnN0IEhlYWRpbmdTdHlsZSA9IHN0eWxlZC5oZ3JvdXA8SGVhZGluZ1Byb3BzPihcclxuXHR7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS4yNScsXHJcblx0XHRtYXJnaW5Ub3A6ICc0MHB4JyxcclxuXHRcdGFsaWduU2VsZjogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0KHsgbGV2ZWwgfSkgPT4gKHtcclxuXHRcdGZvbnRTaXplOiBnZXRIZWFkaW5nU3R5bGUobGV2ZWwpLFxyXG5cdH0pLFxyXG4pO1xyXG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$5
});
const CodeStyle = /* @__PURE__ */ _styled("code", process.env.NODE_ENV === "production" ? {
  target: "e1nl42cg2"
} : {
  target: "e1nl42cg2",
  label: "CodeStyle"
})({
  backgroundColor: theme.colors.aboutLinkIconHover,
  borderRadius: "3px",
  fontSize: ".85rem",
  fontWeight: 700,
  padding: ".2rem .4rem"
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJNa0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vTWFya2Rvd25SZW5kZXJlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBtYXR0ZXIsIHsgR3JheU1hdHRlckZpbGUgfSBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCAnZGF5anMvbG9jYWxlL2VuJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9Qb3N0cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4nO1xyXG5cclxudHlwZSBNYXJrZG93blJlZG5lcmVyUHJvcHMgPSB7XHJcblx0bWFya2Rvd246ICcqLm1kJztcclxufTtcclxuXHJcbnR5cGUgSGVhZGluZ0xldmVscyA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcclxuXHJcbmV4cG9ydCB0eXBlIEhlYWRlclByb3BzID0ge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHN1bW1hcnk6IHN0cmluZztcclxuXHRhdXRob3I6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEN1c3RvbUdyYXlNYXR0ZXJGaWxlID0gR3JheU1hdHRlckZpbGU8XHJcblx0TWFya2Rvd25SZWRuZXJlclByb3BzWydtYXJrZG93biddXHJcbj4gJiB7XHJcblx0ZGF0YTogSGVhZGVyUHJvcHM7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQ29kZVByb3BzXHJcblx0ZXh0ZW5kcyBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcclxuXHRcdFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PixcclxuXHRcdEhUTUxFbGVtZW50XHJcblx0PiB7XHJcblx0Y2xhc3NOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWFya2Rvd25SZWRuZXJlciA9ICh7IG1hcmtkb3duIH06IE1hcmtkb3duUmVkbmVyZXJQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1hcmtkb3duKSBhcyBDdXN0b21HcmF5TWF0dGVyRmlsZTtcclxuXHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoY29kZTogc3RyaW5nKSA9PiB7XHJcblx0XHRjb3B5VG9DbGlwYm9hcmQoY29kZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxXcmFwcGVyPlxyXG5cdFx0XHQ8SGVhZGVyIHsuLi5kYXRhfSAvPlxyXG5cdFx0XHQ8Q3VzdG9tTWFya2Rvd25cclxuXHRcdFx0XHRjb21wb25lbnRzPXt7XHJcblx0XHRcdFx0XHRibG9ja3F1b3RlKHByb3BzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8QmxvY2tRdW90ZVN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2wocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxPcmRlcmVkTGlzdFN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWwocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxVbk9yZGVyZWRMaXN0U3R5bGVkIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29kZShwcm9wczogQ29kZVByb3BzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZTogbGFuZywgLi4ucmVzdCB9ID0gcHJvcHM7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gL2xhbmd1YWdlLShcXHcrKS8uZXhlYyhsYW5nIHx8ICcnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZSA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtYXRjaCA/IChcclxuXHRcdFx0XHRcdFx0XHQ8PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFBhc3RlV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9XCLrs7XsgqztlZjquLBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGNvZGUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9QYXN0ZVdyYXBwZXI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Q3VzdG9tU3ludGF4SGlnaGxpZ3RlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e319XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUlubGluZVN0eWxlcz17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhbmd1YWdlPXttYXRjaFsxXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gd3JhcExvbmdMaW5lc1xyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7Y29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvQ3VzdG9tU3ludGF4SGlnaGxpZ3Rlcj5cclxuXHRcdFx0XHRcdFx0XHQ8Lz5cclxuXHRcdFx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFx0XHQ8Q29kZVN0eWxlIHsuLi5yZXN0fT57Y2hpbGRyZW59PC9Db2RlU3R5bGU+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YShwcm9wcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFuY2hvclN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDEocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezF9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDIocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezJ9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDMocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezN9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDQocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezR9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDUocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezV9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9DdXN0b21NYXJrZG93bj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5hcnRpY2xlKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmNvbnRlbnRUZXh0LFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0bWF4V2lkdGg6ICc3MjBweCcsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS42JyxcclxuXHRnYXA6ICcyNHB4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21NYXJrZG93biA9IHN0eWxlZChNYXJrZG93bikoe1xyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRnYXA6ICcxcmVtJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS41JyxcclxuXHJcblx0JyYgPiA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdG1hcmdpblRvcDogMCxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHByZSc6IHtcclxuXHRcdG1hcmdpbjogJzM1cHggYXV0bycsXHJcblxyXG5cdFx0JyYgPiBwcmUnOiB7XHJcblx0XHRcdG1hcmdpbjogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0JyYgcHJlJzoge1xyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdH0sXHJcblxyXG5cdCdwIGVtJzoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0J2Jsb2NrcXVvdGUsIGRldGFpbHMsIGRsLCBpbCwgcCwgcHJlLCB1bCc6IHtcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjYnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUGFzdGVXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0aGVpZ2h0OiAnMzBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblxyXG5cdCcmOjphZnRlcic6IHtcclxuXHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0YmFja2dyb3VuZDogJyNmYzYyNWQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRcdGJveFNoYWRvdzogJzIwcHggMCAjZmRiYzQwLCA0MHB4IDAgIzM1Y2Q0YicsXHJcblx0XHRoZWlnaHQ6ICcxMnB4JyxcclxuXHRcdGxlZnQ6ICcxMnB4JyxcclxuXHRcdHRvcDogJzlweCcsXHJcblx0XHR3aWR0aDogJzEycHgnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgQ3VzdG9tU3ludGF4SGlnaGxpZ3RlciA9IHN0eWxlZChTeW50YXhIaWdobGlnaHRlcikoe1xyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdHBhZGRpbmc6ICcyNXB4JyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdG92ZXJmbG93OiAnYXV0bycsXHJcbn0pO1xyXG5cclxuY29uc3QgQmxvY2tRdW90ZVN0eWxlID0gc3R5bGVkLmJsb2NrcXVvdGUoe1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJsb2NrcXVvdGVCYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckxlZnQ6IGAuMjVyZW0gc29saWQgJHt0aGVtZS5jb2xvcnMucHJpbWFyeX1gLFxyXG5cdHBhZGRpbmc6ICcuNXJlbSAxcmVtJyxcclxufSk7XHJcblxyXG5jb25zdCBPcmRlcmVkTGlzdFN0eWxlID0gc3R5bGVkLm9sKHtcclxuXHRsaXN0U3R5bGVUeXBlOiAnbnVtYmVyJyxcclxuXHRwYWRkaW5nTGVmdDogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcbn0pO1xyXG5cclxuY29uc3QgVW5PcmRlcmVkTGlzdFN0eWxlZCA9IHN0eWxlZC51bCh7XHJcblx0bGlzdFN0eWxlVHlwZTogJ2Rpc2MnLFxyXG5cdHBhZGRpbmdMZWZ0OiAnMnJlbScsXHJcblx0d2lkdGg6ICcxMDAlJyxcclxufSk7XHJcblxyXG5jb25zdCBDb2RlU3R5bGUgPSBzdHlsZWQuY29kZSh7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbkhvdmVyLFxyXG5cdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0Zm9udFNpemU6ICcuODVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRwYWRkaW5nOiAnLjJyZW0gLjRyZW0nLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvclN0eWxlID0gc3R5bGVkLmEoe1xyXG5cdGJvcmRlckJvdHRvbTogJy4wNXJlbSBzb2xpZCcsXHJcblx0Ym9yZGVyQm90dG9tQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxufSk7XHJcblxyXG5jb25zdCBnZXRIZWFkaW5nU3R5bGUgPSAobGV2ZWw6IEhlYWRpbmdMZXZlbHMpID0+IHtcclxuXHRzd2l0Y2ggKGxldmVsKSB7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdHJldHVybiAnMi41ZW0nOyAvLyBoMeyXkCDtlbTri7ntlZjripQg7Iqk7YOA7J28XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdHJldHVybiAnMmVtJzsgLy8gaDLsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRyZXR1cm4gJzEuNWVtJzsgLy8gaDPsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICcxZW0nOyAvLyDquLDrs7jqsJJcclxuXHR9XHJcbn07XHJcblxyXG50eXBlIEhlYWRpbmdQcm9wcyA9IHtcclxuXHRsZXZlbDogSGVhZGluZ0xldmVscztcclxufTtcclxuXHJcbmNvbnN0IEhlYWRpbmdTdHlsZSA9IHN0eWxlZC5oZ3JvdXA8SGVhZGluZ1Byb3BzPihcclxuXHR7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS4yNScsXHJcblx0XHRtYXJnaW5Ub3A6ICc0MHB4JyxcclxuXHRcdGFsaWduU2VsZjogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0KHsgbGV2ZWwgfSkgPT4gKHtcclxuXHRcdGZvbnRTaXplOiBnZXRIZWFkaW5nU3R5bGUobGV2ZWwpLFxyXG5cdH0pLFxyXG4pO1xyXG4iXX0= */");
const AnchorStyle = /* @__PURE__ */ _styled("a", process.env.NODE_ENV === "production" ? {
  target: "e1nl42cg1"
} : {
  target: "e1nl42cg1",
  label: "AnchorStyle"
})({
  borderBottom: ".05rem solid",
  borderBottomColor: theme.colors.primary,
  color: theme.colors.primary
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1Ob0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vTWFya2Rvd25SZW5kZXJlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBtYXR0ZXIsIHsgR3JheU1hdHRlckZpbGUgfSBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCAnZGF5anMvbG9jYWxlL2VuJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9Qb3N0cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4nO1xyXG5cclxudHlwZSBNYXJrZG93blJlZG5lcmVyUHJvcHMgPSB7XHJcblx0bWFya2Rvd246ICcqLm1kJztcclxufTtcclxuXHJcbnR5cGUgSGVhZGluZ0xldmVscyA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcclxuXHJcbmV4cG9ydCB0eXBlIEhlYWRlclByb3BzID0ge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHN1bW1hcnk6IHN0cmluZztcclxuXHRhdXRob3I6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEN1c3RvbUdyYXlNYXR0ZXJGaWxlID0gR3JheU1hdHRlckZpbGU8XHJcblx0TWFya2Rvd25SZWRuZXJlclByb3BzWydtYXJrZG93biddXHJcbj4gJiB7XHJcblx0ZGF0YTogSGVhZGVyUHJvcHM7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQ29kZVByb3BzXHJcblx0ZXh0ZW5kcyBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcclxuXHRcdFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PixcclxuXHRcdEhUTUxFbGVtZW50XHJcblx0PiB7XHJcblx0Y2xhc3NOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWFya2Rvd25SZWRuZXJlciA9ICh7IG1hcmtkb3duIH06IE1hcmtkb3duUmVkbmVyZXJQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1hcmtkb3duKSBhcyBDdXN0b21HcmF5TWF0dGVyRmlsZTtcclxuXHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoY29kZTogc3RyaW5nKSA9PiB7XHJcblx0XHRjb3B5VG9DbGlwYm9hcmQoY29kZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxXcmFwcGVyPlxyXG5cdFx0XHQ8SGVhZGVyIHsuLi5kYXRhfSAvPlxyXG5cdFx0XHQ8Q3VzdG9tTWFya2Rvd25cclxuXHRcdFx0XHRjb21wb25lbnRzPXt7XHJcblx0XHRcdFx0XHRibG9ja3F1b3RlKHByb3BzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8QmxvY2tRdW90ZVN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2wocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxPcmRlcmVkTGlzdFN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWwocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxVbk9yZGVyZWRMaXN0U3R5bGVkIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29kZShwcm9wczogQ29kZVByb3BzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZTogbGFuZywgLi4ucmVzdCB9ID0gcHJvcHM7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gL2xhbmd1YWdlLShcXHcrKS8uZXhlYyhsYW5nIHx8ICcnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZSA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtYXRjaCA/IChcclxuXHRcdFx0XHRcdFx0XHQ8PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFBhc3RlV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9XCLrs7XsgqztlZjquLBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGNvZGUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9QYXN0ZVdyYXBwZXI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Q3VzdG9tU3ludGF4SGlnaGxpZ3RlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e319XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUlubGluZVN0eWxlcz17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhbmd1YWdlPXttYXRjaFsxXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gd3JhcExvbmdMaW5lc1xyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7Y29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvQ3VzdG9tU3ludGF4SGlnaGxpZ3Rlcj5cclxuXHRcdFx0XHRcdFx0XHQ8Lz5cclxuXHRcdFx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFx0XHQ8Q29kZVN0eWxlIHsuLi5yZXN0fT57Y2hpbGRyZW59PC9Db2RlU3R5bGU+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YShwcm9wcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFuY2hvclN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDEocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezF9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDIocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezJ9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDMocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezN9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDQocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezR9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDUocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezV9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9DdXN0b21NYXJrZG93bj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5hcnRpY2xlKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmNvbnRlbnRUZXh0LFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0bWF4V2lkdGg6ICc3MjBweCcsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS42JyxcclxuXHRnYXA6ICcyNHB4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21NYXJrZG93biA9IHN0eWxlZChNYXJrZG93bikoe1xyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRnYXA6ICcxcmVtJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS41JyxcclxuXHJcblx0JyYgPiA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdG1hcmdpblRvcDogMCxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHByZSc6IHtcclxuXHRcdG1hcmdpbjogJzM1cHggYXV0bycsXHJcblxyXG5cdFx0JyYgPiBwcmUnOiB7XHJcblx0XHRcdG1hcmdpbjogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0JyYgcHJlJzoge1xyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdH0sXHJcblxyXG5cdCdwIGVtJzoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0J2Jsb2NrcXVvdGUsIGRldGFpbHMsIGRsLCBpbCwgcCwgcHJlLCB1bCc6IHtcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjYnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUGFzdGVXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0aGVpZ2h0OiAnMzBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblxyXG5cdCcmOjphZnRlcic6IHtcclxuXHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0YmFja2dyb3VuZDogJyNmYzYyNWQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRcdGJveFNoYWRvdzogJzIwcHggMCAjZmRiYzQwLCA0MHB4IDAgIzM1Y2Q0YicsXHJcblx0XHRoZWlnaHQ6ICcxMnB4JyxcclxuXHRcdGxlZnQ6ICcxMnB4JyxcclxuXHRcdHRvcDogJzlweCcsXHJcblx0XHR3aWR0aDogJzEycHgnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgQ3VzdG9tU3ludGF4SGlnaGxpZ3RlciA9IHN0eWxlZChTeW50YXhIaWdobGlnaHRlcikoe1xyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdHBhZGRpbmc6ICcyNXB4JyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdG92ZXJmbG93OiAnYXV0bycsXHJcbn0pO1xyXG5cclxuY29uc3QgQmxvY2tRdW90ZVN0eWxlID0gc3R5bGVkLmJsb2NrcXVvdGUoe1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJsb2NrcXVvdGVCYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckxlZnQ6IGAuMjVyZW0gc29saWQgJHt0aGVtZS5jb2xvcnMucHJpbWFyeX1gLFxyXG5cdHBhZGRpbmc6ICcuNXJlbSAxcmVtJyxcclxufSk7XHJcblxyXG5jb25zdCBPcmRlcmVkTGlzdFN0eWxlID0gc3R5bGVkLm9sKHtcclxuXHRsaXN0U3R5bGVUeXBlOiAnbnVtYmVyJyxcclxuXHRwYWRkaW5nTGVmdDogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcbn0pO1xyXG5cclxuY29uc3QgVW5PcmRlcmVkTGlzdFN0eWxlZCA9IHN0eWxlZC51bCh7XHJcblx0bGlzdFN0eWxlVHlwZTogJ2Rpc2MnLFxyXG5cdHBhZGRpbmdMZWZ0OiAnMnJlbScsXHJcblx0d2lkdGg6ICcxMDAlJyxcclxufSk7XHJcblxyXG5jb25zdCBDb2RlU3R5bGUgPSBzdHlsZWQuY29kZSh7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbkhvdmVyLFxyXG5cdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0Zm9udFNpemU6ICcuODVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRwYWRkaW5nOiAnLjJyZW0gLjRyZW0nLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvclN0eWxlID0gc3R5bGVkLmEoe1xyXG5cdGJvcmRlckJvdHRvbTogJy4wNXJlbSBzb2xpZCcsXHJcblx0Ym9yZGVyQm90dG9tQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxufSk7XHJcblxyXG5jb25zdCBnZXRIZWFkaW5nU3R5bGUgPSAobGV2ZWw6IEhlYWRpbmdMZXZlbHMpID0+IHtcclxuXHRzd2l0Y2ggKGxldmVsKSB7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdHJldHVybiAnMi41ZW0nOyAvLyBoMeyXkCDtlbTri7ntlZjripQg7Iqk7YOA7J28XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdHJldHVybiAnMmVtJzsgLy8gaDLsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRyZXR1cm4gJzEuNWVtJzsgLy8gaDPsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICcxZW0nOyAvLyDquLDrs7jqsJJcclxuXHR9XHJcbn07XHJcblxyXG50eXBlIEhlYWRpbmdQcm9wcyA9IHtcclxuXHRsZXZlbDogSGVhZGluZ0xldmVscztcclxufTtcclxuXHJcbmNvbnN0IEhlYWRpbmdTdHlsZSA9IHN0eWxlZC5oZ3JvdXA8SGVhZGluZ1Byb3BzPihcclxuXHR7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS4yNScsXHJcblx0XHRtYXJnaW5Ub3A6ICc0MHB4JyxcclxuXHRcdGFsaWduU2VsZjogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0KHsgbGV2ZWwgfSkgPT4gKHtcclxuXHRcdGZvbnRTaXplOiBnZXRIZWFkaW5nU3R5bGUobGV2ZWwpLFxyXG5cdH0pLFxyXG4pO1xyXG4iXX0= */");
const getHeadingStyle = (level) => {
  switch (level) {
    case 1:
      return "2.5em";
    case 2:
      return "2em";
    case 3:
      return "1.5em";
    default:
      return "1em";
  }
};
const HeadingStyle = /* @__PURE__ */ _styled("hgroup", process.env.NODE_ENV === "production" ? {
  target: "e1nl42cg0"
} : {
  target: "e1nl42cg0",
  label: "HeadingStyle"
})({
  color: theme.colors.text,
  fontWeight: 600,
  lineHeight: "1.25",
  marginTop: "40px",
  alignSelf: "flex-start"
}, ({
  level
}) => ({
  fontSize: getHeadingStyle(level)
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL01hcmtkb3duUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBPcUIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vTWFya2Rvd25SZW5kZXJlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBtYXR0ZXIsIHsgR3JheU1hdHRlckZpbGUgfSBmcm9tICdncmF5LW1hdHRlcic7XHJcbmltcG9ydCAnZGF5anMvbG9jYWxlL2VuJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9Qb3N0cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4nO1xyXG5cclxudHlwZSBNYXJrZG93blJlZG5lcmVyUHJvcHMgPSB7XHJcblx0bWFya2Rvd246ICcqLm1kJztcclxufTtcclxuXHJcbnR5cGUgSGVhZGluZ0xldmVscyA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcclxuXHJcbmV4cG9ydCB0eXBlIEhlYWRlclByb3BzID0ge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdHN1bW1hcnk6IHN0cmluZztcclxuXHRhdXRob3I6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEN1c3RvbUdyYXlNYXR0ZXJGaWxlID0gR3JheU1hdHRlckZpbGU8XHJcblx0TWFya2Rvd25SZWRuZXJlclByb3BzWydtYXJrZG93biddXHJcbj4gJiB7XHJcblx0ZGF0YTogSGVhZGVyUHJvcHM7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQ29kZVByb3BzXHJcblx0ZXh0ZW5kcyBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcclxuXHRcdFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PixcclxuXHRcdEhUTUxFbGVtZW50XHJcblx0PiB7XHJcblx0Y2xhc3NOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWFya2Rvd25SZWRuZXJlciA9ICh7IG1hcmtkb3duIH06IE1hcmtkb3duUmVkbmVyZXJQcm9wcykgPT4ge1xyXG5cdGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1hcmtkb3duKSBhcyBDdXN0b21HcmF5TWF0dGVyRmlsZTtcclxuXHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoY29kZTogc3RyaW5nKSA9PiB7XHJcblx0XHRjb3B5VG9DbGlwYm9hcmQoY29kZSk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxXcmFwcGVyPlxyXG5cdFx0XHQ8SGVhZGVyIHsuLi5kYXRhfSAvPlxyXG5cdFx0XHQ8Q3VzdG9tTWFya2Rvd25cclxuXHRcdFx0XHRjb21wb25lbnRzPXt7XHJcblx0XHRcdFx0XHRibG9ja3F1b3RlKHByb3BzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8QmxvY2tRdW90ZVN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2wocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxPcmRlcmVkTGlzdFN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWwocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxVbk9yZGVyZWRMaXN0U3R5bGVkIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29kZShwcm9wczogQ29kZVByb3BzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZTogbGFuZywgLi4ucmVzdCB9ID0gcHJvcHM7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gL2xhbmd1YWdlLShcXHcrKS8uZXhlYyhsYW5nIHx8ICcnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZSA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtYXRjaCA/IChcclxuXHRcdFx0XHRcdFx0XHQ8PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFBhc3RlV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9XCLrs7XsgqztlZjquLBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsaWNrKGNvZGUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9QYXN0ZVdyYXBwZXI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Q3VzdG9tU3ludGF4SGlnaGxpZ3RlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e319XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUlubGluZVN0eWxlcz17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhbmd1YWdlPXttYXRjaFsxXX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gd3JhcExvbmdMaW5lc1xyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7Y29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvQ3VzdG9tU3ludGF4SGlnaGxpZ3Rlcj5cclxuXHRcdFx0XHRcdFx0XHQ8Lz5cclxuXHRcdFx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFx0XHQ8Q29kZVN0eWxlIHsuLi5yZXN0fT57Y2hpbGRyZW59PC9Db2RlU3R5bGU+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YShwcm9wcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFuY2hvclN0eWxlIHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDEocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezF9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDIocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezJ9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDMocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezN9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDQocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezR9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aDUocHJvcHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxIZWFkaW5nU3R5bGUgbGV2ZWw9ezV9IHsuLi5wcm9wc30gLz47XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9DdXN0b21NYXJrZG93bj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5hcnRpY2xlKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLmNvbnRlbnRUZXh0LFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0bWF4V2lkdGg6ICc3MjBweCcsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS42JyxcclxuXHRnYXA6ICcyNHB4JyxcclxufSk7XHJcblxyXG5jb25zdCBDdXN0b21NYXJrZG93biA9IHN0eWxlZChNYXJrZG93bikoe1xyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRnYXA6ICcxcmVtJyxcclxuXHRsaW5lSGVpZ2h0OiAnMS41JyxcclxuXHJcblx0JyYgPiA6Zmlyc3Qtb2YtdHlwZSc6IHtcclxuXHRcdG1hcmdpblRvcDogMCxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHByZSc6IHtcclxuXHRcdG1hcmdpbjogJzM1cHggYXV0bycsXHJcblxyXG5cdFx0JyYgPiBwcmUnOiB7XHJcblx0XHRcdG1hcmdpbjogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0JyYgcHJlJzoge1xyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdH0sXHJcblxyXG5cdCdwIGVtJzoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0J2Jsb2NrcXVvdGUsIGRldGFpbHMsIGRsLCBpbCwgcCwgcHJlLCB1bCc6IHtcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjYnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgUGFzdGVXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0aGVpZ2h0OiAnMzBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblxyXG5cdCcmOjphZnRlcic6IHtcclxuXHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0YmFja2dyb3VuZDogJyNmYzYyNWQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRcdGJveFNoYWRvdzogJzIwcHggMCAjZmRiYzQwLCA0MHB4IDAgIzM1Y2Q0YicsXHJcblx0XHRoZWlnaHQ6ICcxMnB4JyxcclxuXHRcdGxlZnQ6ICcxMnB4JyxcclxuXHRcdHRvcDogJzlweCcsXHJcblx0XHR3aWR0aDogJzEycHgnLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgQ3VzdG9tU3ludGF4SGlnaGxpZ3RlciA9IHN0eWxlZChTeW50YXhIaWdobGlnaHRlcikoe1xyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdHBhZGRpbmc6ICcyNXB4JyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdG92ZXJmbG93OiAnYXV0bycsXHJcbn0pO1xyXG5cclxuY29uc3QgQmxvY2tRdW90ZVN0eWxlID0gc3R5bGVkLmJsb2NrcXVvdGUoe1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJsb2NrcXVvdGVCYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckxlZnQ6IGAuMjVyZW0gc29saWQgJHt0aGVtZS5jb2xvcnMucHJpbWFyeX1gLFxyXG5cdHBhZGRpbmc6ICcuNXJlbSAxcmVtJyxcclxufSk7XHJcblxyXG5jb25zdCBPcmRlcmVkTGlzdFN0eWxlID0gc3R5bGVkLm9sKHtcclxuXHRsaXN0U3R5bGVUeXBlOiAnbnVtYmVyJyxcclxuXHRwYWRkaW5nTGVmdDogJzJyZW0nLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcbn0pO1xyXG5cclxuY29uc3QgVW5PcmRlcmVkTGlzdFN0eWxlZCA9IHN0eWxlZC51bCh7XHJcblx0bGlzdFN0eWxlVHlwZTogJ2Rpc2MnLFxyXG5cdHBhZGRpbmdMZWZ0OiAnMnJlbScsXHJcblx0d2lkdGg6ICcxMDAlJyxcclxufSk7XHJcblxyXG5jb25zdCBDb2RlU3R5bGUgPSBzdHlsZWQuY29kZSh7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbkhvdmVyLFxyXG5cdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0Zm9udFNpemU6ICcuODVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRwYWRkaW5nOiAnLjJyZW0gLjRyZW0nLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuY2hvclN0eWxlID0gc3R5bGVkLmEoe1xyXG5cdGJvcmRlckJvdHRvbTogJy4wNXJlbSBzb2xpZCcsXHJcblx0Ym9yZGVyQm90dG9tQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxufSk7XHJcblxyXG5jb25zdCBnZXRIZWFkaW5nU3R5bGUgPSAobGV2ZWw6IEhlYWRpbmdMZXZlbHMpID0+IHtcclxuXHRzd2l0Y2ggKGxldmVsKSB7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdHJldHVybiAnMi41ZW0nOyAvLyBoMeyXkCDtlbTri7ntlZjripQg7Iqk7YOA7J28XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdHJldHVybiAnMmVtJzsgLy8gaDLsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRyZXR1cm4gJzEuNWVtJzsgLy8gaDPsl5Ag7ZW064u57ZWY64qUIOyKpO2DgOydvFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICcxZW0nOyAvLyDquLDrs7jqsJJcclxuXHR9XHJcbn07XHJcblxyXG50eXBlIEhlYWRpbmdQcm9wcyA9IHtcclxuXHRsZXZlbDogSGVhZGluZ0xldmVscztcclxufTtcclxuXHJcbmNvbnN0IEhlYWRpbmdTdHlsZSA9IHN0eWxlZC5oZ3JvdXA8SGVhZGluZ1Byb3BzPihcclxuXHR7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0XHRmb250V2VpZ2h0OiA2MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS4yNScsXHJcblx0XHRtYXJnaW5Ub3A6ICc0MHB4JyxcclxuXHRcdGFsaWduU2VsZjogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0KHsgbGV2ZWwgfSkgPT4gKHtcclxuXHRcdGZvbnRTaXplOiBnZXRIZWFkaW5nU3R5bGUobGV2ZWwpLFxyXG5cdH0pLFxyXG4pO1xyXG4iXX0= */");

const ScrollHandler = () => {
  const location = useLocation();
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem(`scrollPosition-${location.pathname}`);
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    } else {
      window.scrollTo(0, 0);
    }
    const handleScroll = () => {
      localStorage.setItem(`scrollPosition-${location.pathname}`, window.scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);
  return null;
};

const Template = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Wrapper$5, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(ScrollHandler, {})
  ] }) });
};
const Wrapper$5 = /* @__PURE__ */ _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e7476rt0"
} : {
  target: "e7476rt0",
  label: "Wrapper"
})({
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "375px",
  padding: "0 15px",
  backgroundColor: theme.colors.background
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL1RlbXBsYXRlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQmdCIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL1RlbXBsYXRlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuL3RoZW1lJztcclxuaW1wb3J0IHsgT3V0bGV0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IEZvb3RlciwgU2Nyb2xsSGFuZGxlciB9IGZyb20gJy4nO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRlbXBsYXRlID0gKCkgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8PlxyXG5cdFx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0XHQ8T3V0bGV0IC8+XHJcblx0XHRcdFx0PEZvb3RlciAvPlxyXG5cdFx0XHRcdDxTY3JvbGxIYW5kbGVyIC8+XHJcblx0XHRcdDwvV3JhcHBlcj5cclxuXHRcdDwvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdG1pbkhlaWdodDogJzEwMHZoJyxcclxuXHRmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRtaW5XaWR0aDogJzM3NXB4JyxcclxuXHRwYWRkaW5nOiAnMCAxNXB4JyxcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9ycy5iYWNrZ3JvdW5kLFxyXG59KTtcclxuIl19 */");

const ThemeContext = createContext(null);
const ThemeProvider = ({
  children
}) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  const value = useMemo(() => ({
    theme,
    setTheme
  }), [theme]);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value, children });
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

function _EMOTION_STRINGIFIED_CSS_ERROR__$4() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const ThemeToggler = () => {
  const {
    theme: theme2,
    setTheme
  } = useTheme();
  const nextTheme = theme2 === "light" ? "dark" : "light";
  const toggleTheme = () => {
    setTheme(nextTheme);
  };
  const isDark = theme2 === "dark";
  const transitions = useTransition(isDark, {
    initial: {
      transform: "scale(1) rotate(0deg)",
      opacity: 1
    },
    from: {
      transform: "scale(0) rotate(-180deg)",
      opacity: 0
    },
    enter: {
      transform: "scale(1) rotate(0deg)",
      opacity: 1
    },
    leave: {
      transform: "scale(0) rotate(180deg)",
      opacity: 0
    },
    reverse: true
  });
  return /* @__PURE__ */ jsx(Button, { onClick: toggleTheme, children: transitions((style, item) => item ? /* @__PURE__ */ jsx(Positioner, { children: /* @__PURE__ */ jsx(AnimatedWrapper, { style, children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faMoon }) }) }) : /* @__PURE__ */ jsx(Positioner, { children: /* @__PURE__ */ jsx(AnimatedWrapper, { style, children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faSun }) }) })) });
};
const Button = /* @__PURE__ */ _styled("button", process.env.NODE_ENV === "production" ? {
  target: "e15gw4fv1"
} : {
  target: "e15gw4fv1",
  label: "Button"
})({
  position: "fixed",
  right: "30px",
  bottom: "30px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  border: "none",
  fontSize: "2rem",
  color: theme.colors.text,
  backgroundColor: theme.colors.background2,
  cursor: "pointer"
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL1RoZW1lVG9nZ2xlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNERlIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL1RoZW1lVG9nZ2xlci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlZCwgdXNlVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXNwcmluZyc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcclxuaW1wb3J0IHsgRm9udEF3ZXNvbWVJY29uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJztcclxuaW1wb3J0IHsgZmFNb29uLCBmYVN1biB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnLi90aGVtZSc7XHJcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XHJcbmltcG9ydCB7IHVzZVRoZW1lIH0gZnJvbSAnQGNvbXBvbmVudHMvaG9va3MnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRoZW1lVG9nZ2xlciA9ICgpID0+IHtcclxuXHRjb25zdCB7IHRoZW1lLCBzZXRUaGVtZSB9ID0gdXNlVGhlbWUoKTtcclxuXHRjb25zdCBuZXh0VGhlbWU6IFRoZW1lVHlwZSA9IHRoZW1lID09PSAnbGlnaHQnID8gJ2RhcmsnIDogJ2xpZ2h0JztcclxuXHJcblx0Y29uc3QgdG9nZ2xlVGhlbWUgPSAoKSA9PiB7XHJcblx0XHRzZXRUaGVtZShuZXh0VGhlbWUpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGlzRGFyayA9IHRoZW1lID09PSAnZGFyayc7XHJcblxyXG5cdGNvbnN0IHRyYW5zaXRpb25zID0gdXNlVHJhbnNpdGlvbihpc0RhcmssIHtcclxuXHRcdGluaXRpYWw6IHtcclxuXHRcdFx0dHJhbnNmb3JtOiAnc2NhbGUoMSkgcm90YXRlKDBkZWcpJyxcclxuXHRcdFx0b3BhY2l0eTogMSxcclxuXHRcdH0sXHJcblx0XHRmcm9tOiB7XHJcblx0XHRcdHRyYW5zZm9ybTogJ3NjYWxlKDApIHJvdGF0ZSgtMTgwZGVnKScsXHJcblx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHR9LFxyXG5cdFx0ZW50ZXI6IHtcclxuXHRcdFx0dHJhbnNmb3JtOiAnc2NhbGUoMSkgcm90YXRlKDBkZWcpJyxcclxuXHRcdFx0b3BhY2l0eTogMSxcclxuXHRcdH0sXHJcblx0XHRsZWF2ZToge1xyXG5cdFx0XHR0cmFuc2Zvcm06ICdzY2FsZSgwKSByb3RhdGUoMTgwZGVnKScsXHJcblx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHR9LFxyXG5cclxuXHRcdHJldmVyc2U6IHRydWUsXHJcblx0fSk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8QnV0dG9uIG9uQ2xpY2s9e3RvZ2dsZVRoZW1lfT5cclxuXHRcdFx0e3RyYW5zaXRpb25zKChzdHlsZSwgaXRlbSkgPT5cclxuXHRcdFx0XHRpdGVtID8gKFxyXG5cdFx0XHRcdFx0PFBvc2l0aW9uZXI+XHJcblx0XHRcdFx0XHRcdDxBbmltYXRlZFdyYXBwZXIgc3R5bGU9e3N0eWxlfT5cclxuXHRcdFx0XHRcdFx0XHQ8Rm9udEF3ZXNvbWVJY29uIGljb249e2ZhTW9vbn0gLz5cclxuXHRcdFx0XHRcdFx0PC9BbmltYXRlZFdyYXBwZXI+XHJcblx0XHRcdFx0XHQ8L1Bvc2l0aW9uZXI+XHJcblx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdDxQb3NpdGlvbmVyPlxyXG5cdFx0XHRcdFx0XHQ8QW5pbWF0ZWRXcmFwcGVyIHN0eWxlPXtzdHlsZX0+XHJcblx0XHRcdFx0XHRcdFx0PEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYVN1bn0gLz5cclxuXHRcdFx0XHRcdFx0PC9BbmltYXRlZFdyYXBwZXI+XHJcblx0XHRcdFx0XHQ8L1Bvc2l0aW9uZXI+XHJcblx0XHRcdFx0KSxcclxuXHRcdFx0KX1cclxuXHRcdDwvQnV0dG9uPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBCdXR0b24gPSBzdHlsZWQuYnV0dG9uKHtcclxuXHRwb3NpdGlvbjogJ2ZpeGVkJyxcclxuXHRyaWdodDogJzMwcHgnLFxyXG5cdGJvdHRvbTogJzMwcHgnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0Ym9yZGVyUmFkaXVzOiAnNTAlJyxcclxuXHRib3JkZXI6ICdub25lJyxcclxuXHRmb250U2l6ZTogJzJyZW0nLFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMudGV4dCxcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9ycy5iYWNrZ3JvdW5kMixcclxuXHRjdXJzb3I6ICdwb2ludGVyJyxcclxufSk7XHJcblxyXG5jb25zdCBQb3NpdGlvbmVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0dG9wOiAnNTAlJyxcclxuXHRsZWZ0OiAnNTAlJyxcclxuXHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxyXG59KTtcclxuXHJcbmNvbnN0IEFuaW1hdGVkV3JhcHBlciA9IGFuaW1hdGVkKCdkaXYnKTtcclxuIl19 */");
const Positioner = /* @__PURE__ */ _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e15gw4fv0"
} : {
  target: "e15gw4fv0",
  label: "Positioner"
})(process.env.NODE_ENV === "production" ? {
  name: "1aslf6p",
  styles: "position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)"
} : {
  name: "1aslf6p",
  styles: "position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL1RoZW1lVG9nZ2xlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEVtQiIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9jb21wb25lbnRzL2NvbW1vbi9UaGVtZVRvZ2dsZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZWQsIHVzZVRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC1zcHJpbmcnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCB7IEZvbnRBd2Vzb21lSWNvbiB9IGZyb20gJ0Bmb3J0YXdlc29tZS9yZWFjdC1mb250YXdlc29tZSc7XHJcbmltcG9ydCB7IGZhTW9vbiwgZmFTdW4gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xyXG5pbXBvcnQgeyB0aGVtZSB9IGZyb20gJy4vdGhlbWUnO1xyXG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xyXG5pbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJ0Bjb21wb25lbnRzL2hvb2tzJztcclxuXHJcbmV4cG9ydCBjb25zdCBUaGVtZVRvZ2dsZXIgPSAoKSA9PiB7XHJcblx0Y29uc3QgeyB0aGVtZSwgc2V0VGhlbWUgfSA9IHVzZVRoZW1lKCk7XHJcblx0Y29uc3QgbmV4dFRoZW1lOiBUaGVtZVR5cGUgPSB0aGVtZSA9PT0gJ2xpZ2h0JyA/ICdkYXJrJyA6ICdsaWdodCc7XHJcblxyXG5cdGNvbnN0IHRvZ2dsZVRoZW1lID0gKCkgPT4ge1xyXG5cdFx0c2V0VGhlbWUobmV4dFRoZW1lKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBpc0RhcmsgPSB0aGVtZSA9PT0gJ2RhcmsnO1xyXG5cclxuXHRjb25zdCB0cmFuc2l0aW9ucyA9IHVzZVRyYW5zaXRpb24oaXNEYXJrLCB7XHJcblx0XHRpbml0aWFsOiB7XHJcblx0XHRcdHRyYW5zZm9ybTogJ3NjYWxlKDEpIHJvdGF0ZSgwZGVnKScsXHJcblx0XHRcdG9wYWNpdHk6IDEsXHJcblx0XHR9LFxyXG5cdFx0ZnJvbToge1xyXG5cdFx0XHR0cmFuc2Zvcm06ICdzY2FsZSgwKSByb3RhdGUoLTE4MGRlZyknLFxyXG5cdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0fSxcclxuXHRcdGVudGVyOiB7XHJcblx0XHRcdHRyYW5zZm9ybTogJ3NjYWxlKDEpIHJvdGF0ZSgwZGVnKScsXHJcblx0XHRcdG9wYWNpdHk6IDEsXHJcblx0XHR9LFxyXG5cdFx0bGVhdmU6IHtcclxuXHRcdFx0dHJhbnNmb3JtOiAnc2NhbGUoMCkgcm90YXRlKDE4MGRlZyknLFxyXG5cdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0fSxcclxuXHJcblx0XHRyZXZlcnNlOiB0cnVlLFxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PEJ1dHRvbiBvbkNsaWNrPXt0b2dnbGVUaGVtZX0+XHJcblx0XHRcdHt0cmFuc2l0aW9ucygoc3R5bGUsIGl0ZW0pID0+XHJcblx0XHRcdFx0aXRlbSA/IChcclxuXHRcdFx0XHRcdDxQb3NpdGlvbmVyPlxyXG5cdFx0XHRcdFx0XHQ8QW5pbWF0ZWRXcmFwcGVyIHN0eWxlPXtzdHlsZX0+XHJcblx0XHRcdFx0XHRcdFx0PEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYU1vb259IC8+XHJcblx0XHRcdFx0XHRcdDwvQW5pbWF0ZWRXcmFwcGVyPlxyXG5cdFx0XHRcdFx0PC9Qb3NpdGlvbmVyPlxyXG5cdFx0XHRcdCkgOiAoXHJcblx0XHRcdFx0XHQ8UG9zaXRpb25lcj5cclxuXHRcdFx0XHRcdFx0PEFuaW1hdGVkV3JhcHBlciBzdHlsZT17c3R5bGV9PlxyXG5cdFx0XHRcdFx0XHRcdDxGb250QXdlc29tZUljb24gaWNvbj17ZmFTdW59IC8+XHJcblx0XHRcdFx0XHRcdDwvQW5pbWF0ZWRXcmFwcGVyPlxyXG5cdFx0XHRcdFx0PC9Qb3NpdGlvbmVyPlxyXG5cdFx0XHRcdCksXHJcblx0XHRcdCl9XHJcblx0XHQ8L0J1dHRvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgQnV0dG9uID0gc3R5bGVkLmJ1dHRvbih7XHJcblx0cG9zaXRpb246ICdmaXhlZCcsXHJcblx0cmlnaHQ6ICczMHB4JyxcclxuXHRib3R0b206ICczMHB4JyxcclxuXHR3aWR0aDogJzYwcHgnLFxyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdGJvcmRlclJhZGl1czogJzUwJScsXHJcblx0Ym9yZGVyOiAnbm9uZScsXHJcblx0Zm9udFNpemU6ICcycmVtJyxcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMuYmFja2dyb3VuZDIsXHJcblx0Y3Vyc29yOiAncG9pbnRlcicsXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zaXRpb25lciA9IHN0eWxlZC5kaXYoe1xyXG5cdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdHRvcDogJzUwJScsXHJcblx0bGVmdDogJzUwJScsXHJcblx0dHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcclxufSk7XHJcblxyXG5jb25zdCBBbmltYXRlZFdyYXBwZXIgPSBhbmltYXRlZCgnZGl2Jyk7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$4
});
const AnimatedWrapper = animated("div");

const Toast = ({
  children,
  delay = 2e3
}) => {
  return /* @__PURE__ */ jsx(Wrapper$4, { delay, children });
};
const fadeOut = keyframes`
		0% {
			opacity: 0;
			bottom: 30px;
		}
		80% {
			opacity: 1;
			bottom: 61px;
		}
		100% {
			opacity: 0;
			bottom: 30px;
		}
	`;
const Wrapper$4 = /* @__PURE__ */ _styled("div", process.env.NODE_ENV === "production" ? {
  target: "eqi7zwk0"
} : {
  target: "eqi7zwk0",
  label: "Wrapper"
})(({
  delay
}) => ({
  position: "absolute",
  transform: "translate3d(-50%, 20px, 0)",
  borderRadius: "2rem",
  padding: "10px 20px",
  backgroundColor: "rgba(55, 55, 55, 0.85)",
  color: "#f1f1f1",
  opacity: 0,
  animation: `${fadeOut} ${delay}ms cubic-bezier(0.18, 0.89, 0.32, 1.28)`,
  whiteSpace: "pre"
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL1RvYXN0L1RvYXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3QmdCIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL1RvYXN0L1RvYXN0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFRvYXN0UHJvcHMgfSBmcm9tICd0eXBlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgVG9hc3QgPSAoeyBjaGlsZHJlbiwgZGVsYXkgPSAyMDAwIH06IFRvYXN0UHJvcHMpID0+IHtcclxuXHRyZXR1cm4gPFdyYXBwZXIgZGVsYXk9e2RlbGF5fT57Y2hpbGRyZW4gYXMgUmVhY3ROb2RlfTwvV3JhcHBlcj47XHJcbn07XHJcblxyXG5jb25zdCBmYWRlT3V0ID0ga2V5ZnJhbWVzYFxyXG5cdFx0MCUge1xyXG5cdFx0XHRvcGFjaXR5OiAwO1xyXG5cdFx0XHRib3R0b206IDMwcHg7XHJcblx0XHR9XHJcblx0XHQ4MCUge1xyXG5cdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRib3R0b206IDYxcHg7XHJcblx0XHR9XHJcblx0XHQxMDAlIHtcclxuXHRcdFx0b3BhY2l0eTogMDtcclxuXHRcdFx0Ym90dG9tOiAzMHB4O1xyXG5cdFx0fVxyXG5cdGA7XHJcblxyXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdjx7IGRlbGF5OiBudW1iZXIgfT4oKHsgZGVsYXkgfSkgPT4gKHtcclxuXHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtNTAlLCAyMHB4LCAwKScsXHJcblx0Ym9yZGVyUmFkaXVzOiAnMnJlbScsXHJcblx0cGFkZGluZzogJzEwcHggMjBweCcsXHJcblx0YmFja2dyb3VuZENvbG9yOiAncmdiYSg1NSwgNTUsIDU1LCAwLjg1KScsXHJcblx0Y29sb3I6ICcjZjFmMWYxJyxcclxuXHRvcGFjaXR5OiAwLFxyXG5cdGFuaW1hdGlvbjogYCR7ZmFkZU91dH0gJHtkZWxheX1tcyBjdWJpYy1iZXppZXIoMC4xOCwgMC44OSwgMC4zMiwgMS4yOClgLFxyXG5cdHdoaXRlU3BhY2U6ICdwcmUnLFxyXG59KSk7XHJcbiJdfQ== */");

const ToastContainer = () => {
  const [, setToastIds] = useState([]);
  const toastToRender = useRef(/* @__PURE__ */ new Map()).current;
  useEffect(() => {
    eventManager.on(Event.Show, buildToast).on(Event.Clear, clearToast);
    return () => {
      toastToRender.clear();
      eventManager.off(Event.Show).off(Event.Clear);
    };
  }, []);
  function clearToast(toastId) {
    removeToast(toastId);
  }
  function removeToast(toastId) {
    setToastIds((cur) => toastId === void 0 ? [] : cur.filter((id) => id !== toastId));
    toastToRender.delete(toastId);
  }
  function appendToast(content, toastProps) {
    const {
      toastId
    } = toastProps;
    const toast = {
      content,
      props: toastProps
    };
    toastToRender.set(toastId, toast);
    setToastIds((cur) => [...cur, toastId]);
  }
  function buildToast(content, {
    delay,
    ...options
  }) {
    const {
      toastId
    } = options;
    const closeToast = () => {
      removeToast(toastId);
    };
    const toastProps = {
      ...options,
      delay,
      closeToast
    };
    appendToast(content, toastProps);
    setTimeout(() => {
      closeToast();
    }, delay);
  }
  return /* @__PURE__ */ jsx(ToastModal, { children: Array.from(toastToRender.values()).map(({
    content,
    props: toastProps
  }) => {
    return /* @__PURE__ */ createElement(Toast, { ...toastProps, key: `toast-${toastProps.toastId}` }, content);
  }) });
};

function _EMOTION_STRINGIFIED_CSS_ERROR__$3() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const ToastModal = ({
  children
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  if (typeof window === "undefined")
    return /* @__PURE__ */ jsx(Fragment, {});
  return mounted ? createPortal(/* @__PURE__ */ jsx(Wrapper$3, { children }), document.getElementById("modal")) : /* @__PURE__ */ jsx(Fragment, {});
};
const Wrapper$3 = /* @__PURE__ */ _styled("div", process.env.NODE_ENV === "production" ? {
  target: "eksqqpx0"
} : {
  target: "eksqqpx0",
  label: "Wrapper"
})(process.env.NODE_ENV === "production" ? {
  name: "a4szhk",
  styles: "position:fixed;left:50%;transform:translate3d(-50%, 20px, 0);bottom:30px"
} : {
  name: "a4szhk",
  styles: "position:fixed;left:50%;transform:translate3d(-50%, 20px, 0);bottom:30px",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvY29tbW9uL1RvYXN0L1RvYXN0TW9kYWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZCZ0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9jb21tb24vVG9hc3QvVG9hc3RNb2RhbC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IFRvYXN0Q29udGVudCB9IGZyb20gJ3R5cGVzJztcclxuaW1wb3J0IHsgUmVhY3ROb2RlLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW50ZXJmYWNlIFRvYXN0TW9kYWxQcm9wcyB7XHJcblx0Y2hpbGRyZW46IFRvYXN0Q29udGVudDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFRvYXN0TW9kYWwgPSAoeyBjaGlsZHJlbiB9OiBUb2FzdE1vZGFsUHJvcHMpID0+IHtcclxuXHRjb25zdCBbbW91bnRlZCwgc2V0TW91bnRlZF0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcblxyXG5cdHVzZUVmZmVjdCgoKSA9PiB7XHJcblx0XHRzZXRNb3VudGVkKHRydWUpO1xyXG5cdFx0cmV0dXJuICgpID0+IHNldE1vdW50ZWQoZmFsc2UpO1xyXG5cdH0sIFtdKTtcclxuXHJcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gPD48Lz47XHJcblxyXG5cdHJldHVybiBtb3VudGVkID8gKFxyXG5cdFx0Y3JlYXRlUG9ydGFsKFxyXG5cdFx0XHQ8V3JhcHBlcj57Y2hpbGRyZW4gYXMgUmVhY3ROb2RlfTwvV3JhcHBlcj4sXHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpIGFzIEhUTUxFbGVtZW50LFxyXG5cdFx0KVxyXG5cdCkgOiAoXHJcblx0XHQ8PjwvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0cG9zaXRpb246ICdmaXhlZCcsXHJcblx0bGVmdDogJzUwJScsXHJcblx0dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTUwJSwgMjBweCwgMCknLFxyXG5cdGJvdHRvbTogJzMwcHgnLFxyXG59KTtcclxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$3
});

// src/index.tsx

// src/constants.ts
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";

// src/utils.ts
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(propsList, "title" /* TITLE */);
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props["base" /* BASE */] !== "undefined").map((props) => props["base" /* BASE */]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" /* REL */ && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" /* REL */ && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" /* INNER_HTML */ || attributeKey === "cssText" /* CSS_TEXT */ || attributeKey === "itemprop" /* ITEM_PROP */)) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList(["href" /* HREF */], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes" /* BODY */, propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes" /* HTML */, propsList),
  linkTags: getTagsFromPropsList(
    "link" /* LINK */,
    ["rel" /* REL */, "href" /* HREF */],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta" /* META */,
    [
      "name" /* NAME */,
      "charset" /* CHARSET */,
      "http-equiv" /* HTTPEQUIV */,
      "property" /* PROPERTY */,
      "itemprop" /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript" /* NOSCRIPT */, ["innerHTML" /* INNER_HTML */], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script" /* SCRIPT */,
    ["src" /* SRC */, "innerHTML" /* INNER_HTML */],
    propsList
  ),
  styleTags: getTagsFromPropsList("style" /* STYLE */, ["cssText" /* CSS_TEXT */], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes" /* TITLE */, propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};

// src/server.ts
var SELF_CLOSING_TAGS = ["noscript" /* NOSCRIPT */, "script" /* SCRIPT */, "style" /* STYLE */];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" /* INNER_HTML */ || attribute === "cssText" /* CSS_TEXT */)
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React3.createElement("title" /* TITLE */, props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" /* INNER_HTML */ || mappedAttribute === "cssText" /* CSS_TEXT */) {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React3.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title" /* TITLE */:
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes" /* BODY */:
    case "htmlAttributes" /* HTML */:
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta" /* META */, meta.priority),
      ...generateTagsAsReactComponent("link" /* LINK */, link.priority),
      ...generateTagsAsReactComponent("script" /* SCRIPT */, script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta" /* META */, meta.priority, encode)} ${getMethodsForTag(
        "link" /* LINK */,
        link.priority,
        encode
      )} ${getMethodsForTag("script" /* SCRIPT */, script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base" /* BASE */, baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes" /* BODY */, bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes" /* HTML */, htmlAttributes, encode),
    link: getMethodsForTag("link" /* LINK */, linkTags, encode),
    meta: getMethodsForTag("meta" /* META */, metaTags, encode),
    noscript: getMethodsForTag("noscript" /* NOSCRIPT */, noscriptTags, encode),
    script: getMethodsForTag("script" /* SCRIPT */, scriptTags, encode),
    style: getMethodsForTag("style" /* STYLE */, styleTags, encode),
    title: getMethodsForTag("title" /* TITLE */, { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;

// src/HelmetData.ts
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  instances = [];
  canUseDOM = isDocument;
  context;
  value = {
    setHelmet: (serverState) => {
      this.context.helmet = serverState;
    },
    helmetInstances: {
      get: () => this.canUseDOM ? instances : this.instances,
      add: (instance) => {
        (this.canUseDOM ? instances : this.instances).push(instance);
      },
      remove: (instance) => {
        const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
        (this.canUseDOM ? instances : this.instances).splice(index, 1);
      }
    }
  };
  constructor(context, canUseDOM) {
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};

// src/Provider.tsx
var defaultValue = {};
var Context = React3.createContext(defaultValue);
var HelmetProvider = class _HelmetProvider extends Component {
  static canUseDOM = isDocument;
  helmetData;
  constructor(props) {
    super(props);
    this.helmetData = new HelmetData(this.props.context || {}, _HelmetProvider.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React3.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
};

// src/client.ts
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector("head" /* HEAD */);
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML" /* INNER_HTML */) {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText" /* CSS_TEXT */) {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => tag.parentNode?.removeChild(tag));
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title" /* TITLE */, attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body" /* BODY */, bodyAttributes);
  updateAttributes("html" /* HTML */, htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base" /* BASE */, baseTag),
    linkTags: updateTags("link" /* LINK */, linkTags),
    metaTags: updateTags("meta" /* META */, metaTags),
    noscriptTags: updateTags("noscript" /* NOSCRIPT */, noscriptTags),
    scriptTags: updateTags("script" /* SCRIPT */, scriptTags),
    styleTags: updateTags("style" /* STYLE */, styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;

// src/Dispatcher.tsx
var HelmetDispatcher = class extends Component {
  rendered = false;
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};

// src/index.tsx
var Helmet = class extends Component {
  static defaultProps = {
    defer: true,
    encodeSpecialCharacters: true,
    prioritizeSeoTags: false
  };
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script" /* SCRIPT */:
      case "noscript" /* NOSCRIPT */:
        return {
          innerHTML: nestedChildren
        };
      case "style" /* STYLE */:
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title" /* TITLE */:
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body" /* BODY */:
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html" /* HTML */:
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React3.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)" /* FRAGMENT */:
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link" /* LINK */:
        case "meta" /* META */:
        case "noscript" /* NOSCRIPT */:
        case "script" /* SCRIPT */:
        case "style" /* STYLE */:
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React3.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context }));
  }
};

const Seo = ({
  title,
  description,
  author
}) => {
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: "Your Page Title" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:author", content: author }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
  ] });
};

function _EMOTION_STRINGIFIED_CSS_ERROR__$2() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const Main$1 = () => {
  return /* @__PURE__ */ jsxs(Wrapper$2, { children: [
    /* @__PURE__ */ jsx(Seo, { title: "Main", description: "섭이의 개발 블로그", author: "uiseop" }),
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx(Title, { children: "CHUG ALONG" }),
      /* @__PURE__ */ jsx(Author, { children: "by Seop_ee" })
    ] }),
    /* @__PURE__ */ jsx(Navigation, { children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(StyledLink, { to: "/", children: "HOME" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(StyledLink, { to: "/about", children: "ABOUT" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(StyledLink, { to: "/posts", children: "POSTS" }) })
    ] }) })
  ] });
};
const Wrapper$2 = /* @__PURE__ */ _styled("div", process.env.NODE_ENV === "production" ? {
  target: "eokzd394"
} : {
  target: "eokzd394",
  label: "Wrapper"
})(process.env.NODE_ENV === "production" ? {
  name: "5o9i4z",
  styles: "height:100vh;display:flex;justify-content:center;align-items:center;gap:135px"
} : {
  name: "5o9i4z",
  styles: "height:100vh;display:flex;justify-content:center;align-items:center;gap:135px",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL3BhZ2VzL01haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStCZ0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvcGFnZXMvTWFpbi50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTmF2TGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL3RoZW1lJztcclxuaW1wb3J0IHsgU2VvIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL1Nlbyc7XHJcblxyXG5jb25zdCBNYWluOiBGdW5jdGlvbkNvbXBvbmVudCA9ICgpID0+IHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PFdyYXBwZXI+XHJcblx0XHRcdDxTZW8gdGl0bGU9XCJNYWluXCIgZGVzY3JpcHRpb249XCLshK3snbTsnZgg6rCc67CcIOu4lOuhnOq3uFwiIGF1dGhvcj1cInVpc2VvcFwiIC8+XHJcblx0XHRcdDxoZWFkZXI+XHJcblx0XHRcdFx0PFRpdGxlPkNIVUcgQUxPTkc8L1RpdGxlPlxyXG5cdFx0XHRcdDxBdXRob3I+YnkgU2VvcF9lZTwvQXV0aG9yPlxyXG5cdFx0XHQ8L2hlYWRlcj5cclxuXHRcdFx0PE5hdmlnYXRpb24+XHJcblx0XHRcdFx0PHVsPlxyXG5cdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHQ8U3R5bGVkTGluayB0bz1cIi9cIj5IT01FPC9TdHlsZWRMaW5rPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0PFN0eWxlZExpbmsgdG89XCIvYWJvdXRcIj5BQk9VVDwvU3R5bGVkTGluaz5cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdDxTdHlsZWRMaW5rIHRvPVwiL3Bvc3RzXCI+UE9TVFM8L1N0eWxlZExpbms+XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdDwvdWw+XHJcblx0XHRcdDwvTmF2aWdhdGlvbj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXYoe1xyXG5cdGhlaWdodDogJzEwMHZoJyxcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdGdhcDogJzEzNXB4JyxcclxufSk7XHJcblxyXG5jb25zdCBUaXRsZSA9IHN0eWxlZC5oMSh7XHJcblx0Zm9udFNpemU6ICczcmVtJyxcclxuXHRmb250V2VpZ2h0OiA3MDAsXHJcblx0Y29sb3I6IHRoZW1lLmNvbG9ycy50ZXh0LFxyXG59KTtcclxuXHJcbmNvbnN0IEF1dGhvciA9IHN0eWxlZC5zcGFuKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0Zm9udFNpemU6ICcxLjVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDYwMCxcclxufSk7XHJcblxyXG5jb25zdCBOYXZpZ2F0aW9uID0gc3R5bGVkLm5hdih7XHJcblx0JyYgPiB1bCc6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0ZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcblx0XHRnYXA6ICczMHB4JyxcclxuXHJcblx0XHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHRsZWZ0OiAnLTMwcHgnLFxyXG5cdFx0XHR0b3A6ICcxMHB4JyxcclxuXHRcdFx0Ym90dG9tOiAnMTBweCcsXHJcblx0XHRcdGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHt0aGVtZS5jb2xvcnMudGV4dH1gLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxuXHJcbmNvbnN0IFN0eWxlZExpbmsgPSBzdHlsZWQoTmF2TGluaykoe1xyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMudGV4dCxcclxuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHJcblx0JyY6aG92ZXInOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0fSxcclxuXHJcblx0JyY6OmFmdGVyJzoge1xyXG5cdFx0Y29udGVudDogJ1wiXCInLFxyXG5cdFx0Ym9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuY29sb3JzLnRleHR9YCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6ICcxM3B4JyxcclxuXHRcdGhlaWdodDogJzFweCcsXHJcblx0XHRsZWZ0OiAnLTM2cHgnLFxyXG5cdFx0dG9wOiAnNTAlJyxcclxuXHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxyXG5cdH0sXHJcblxyXG5cdCcmLmFjdGl2ZSc6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHR3aWR0aDogJzEzcHgnLFxyXG5cdFx0XHRoZWlnaHQ6ICcxM3B4JyxcclxuXHRcdFx0bGVmdDogJy0zNnB4JyxcclxuXHRcdFx0dG9wOiAnNTAlJyxcclxuXHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcblx0XHRcdHpJbmRleDogJzEnLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1haW47XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2
});
const Title = /* @__PURE__ */ _styled("h1", process.env.NODE_ENV === "production" ? {
  target: "eokzd393"
} : {
  target: "eokzd393",
  label: "Title"
})({
  fontSize: "3rem",
  fontWeight: 700,
  color: theme.colors.text
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL3BhZ2VzL01haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVDYyIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9wYWdlcy9NYWluLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vdGhlbWUnO1xyXG5pbXBvcnQgeyBTZW8gfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vU2VvJztcclxuXHJcbmNvbnN0IE1haW46IEZ1bmN0aW9uQ29tcG9uZW50ID0gKCkgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0PFNlbyB0aXRsZT1cIk1haW5cIiBkZXNjcmlwdGlvbj1cIuyEreydtOydmCDqsJzrsJwg67iU66Gc6re4XCIgYXV0aG9yPVwidWlzZW9wXCIgLz5cclxuXHRcdFx0PGhlYWRlcj5cclxuXHRcdFx0XHQ8VGl0bGU+Q0hVRyBBTE9ORzwvVGl0bGU+XHJcblx0XHRcdFx0PEF1dGhvcj5ieSBTZW9wX2VlPC9BdXRob3I+XHJcblx0XHRcdDwvaGVhZGVyPlxyXG5cdFx0XHQ8TmF2aWdhdGlvbj5cclxuXHRcdFx0XHQ8dWw+XHJcblx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdDxTdHlsZWRMaW5rIHRvPVwiL1wiPkhPTUU8L1N0eWxlZExpbms+XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHQ8U3R5bGVkTGluayB0bz1cIi9hYm91dFwiPkFCT1VUPC9TdHlsZWRMaW5rPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0PFN0eWxlZExpbmsgdG89XCIvcG9zdHNcIj5QT1NUUzwvU3R5bGVkTGluaz5cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0PC91bD5cclxuXHRcdFx0PC9OYXZpZ2F0aW9uPlxyXG5cdFx0PC9XcmFwcGVyPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0aGVpZ2h0OiAnMTAwdmgnLFxyXG5cdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0Z2FwOiAnMTM1cHgnLFxyXG59KTtcclxuXHJcbmNvbnN0IFRpdGxlID0gc3R5bGVkLmgxKHtcclxuXHRmb250U2l6ZTogJzNyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcbn0pO1xyXG5cclxuY29uc3QgQXV0aG9yID0gc3R5bGVkLnNwYW4oe1xyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHRmb250U2l6ZTogJzEuNXJlbScsXHJcblx0Zm9udFdlaWdodDogNjAwLFxyXG59KTtcclxuXHJcbmNvbnN0IE5hdmlnYXRpb24gPSBzdHlsZWQubmF2KHtcclxuXHQnJiA+IHVsJzoge1xyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuXHRcdGdhcDogJzMwcHgnLFxyXG5cclxuXHRcdCcmOjpiZWZvcmUnOiB7XHJcblx0XHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdGxlZnQ6ICctMzBweCcsXHJcblx0XHRcdHRvcDogJzEwcHgnLFxyXG5cdFx0XHRib3R0b206ICcxMHB4JyxcclxuXHRcdFx0Ym9yZGVyTGVmdDogYDFweCBzb2xpZCAke3RoZW1lLmNvbG9ycy50ZXh0fWAsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgU3R5bGVkTGluayA9IHN0eWxlZChOYXZMaW5rKSh7XHJcblx0Y29sb3I6IHRoZW1lLmNvbG9ycy50ZXh0LFxyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cclxuXHQnJjpob3Zlcic6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHR9LFxyXG5cclxuXHQnJjo6YWZ0ZXInOiB7XHJcblx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5jb2xvcnMudGV4dH1gLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHR3aWR0aDogJzEzcHgnLFxyXG5cdFx0aGVpZ2h0OiAnMXB4JyxcclxuXHRcdGxlZnQ6ICctMzZweCcsXHJcblx0XHR0b3A6ICc1MCUnLFxyXG5cdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcblx0fSxcclxuXHJcblx0JyYuYWN0aXZlJzoge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cclxuXHRcdCcmOjpiZWZvcmUnOiB7XHJcblx0XHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdHdpZHRoOiAnMTNweCcsXHJcblx0XHRcdGhlaWdodDogJzEzcHgnLFxyXG5cdFx0XHRsZWZ0OiAnLTM2cHgnLFxyXG5cdFx0XHR0b3A6ICc1MCUnLFxyXG5cdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyxcclxuXHRcdFx0ekluZGV4OiAnMScsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFpbjtcclxuIl19 */");
const Author = /* @__PURE__ */ _styled("span", process.env.NODE_ENV === "production" ? {
  target: "eokzd392"
} : {
  target: "eokzd392",
  label: "Author"
})({
  color: theme.colors.primary,
  fontSize: "1.5rem",
  fontWeight: 600
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL3BhZ2VzL01haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZDZSIsImZpbGUiOiJTOi9yZWFjdC1pbml0L3NyYy9wYWdlcy9NYWluLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vdGhlbWUnO1xyXG5pbXBvcnQgeyBTZW8gfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vU2VvJztcclxuXHJcbmNvbnN0IE1haW46IEZ1bmN0aW9uQ29tcG9uZW50ID0gKCkgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0PFNlbyB0aXRsZT1cIk1haW5cIiBkZXNjcmlwdGlvbj1cIuyEreydtOydmCDqsJzrsJwg67iU66Gc6re4XCIgYXV0aG9yPVwidWlzZW9wXCIgLz5cclxuXHRcdFx0PGhlYWRlcj5cclxuXHRcdFx0XHQ8VGl0bGU+Q0hVRyBBTE9ORzwvVGl0bGU+XHJcblx0XHRcdFx0PEF1dGhvcj5ieSBTZW9wX2VlPC9BdXRob3I+XHJcblx0XHRcdDwvaGVhZGVyPlxyXG5cdFx0XHQ8TmF2aWdhdGlvbj5cclxuXHRcdFx0XHQ8dWw+XHJcblx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdDxTdHlsZWRMaW5rIHRvPVwiL1wiPkhPTUU8L1N0eWxlZExpbms+XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHQ8U3R5bGVkTGluayB0bz1cIi9hYm91dFwiPkFCT1VUPC9TdHlsZWRMaW5rPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0PFN0eWxlZExpbmsgdG89XCIvcG9zdHNcIj5QT1NUUzwvU3R5bGVkTGluaz5cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0PC91bD5cclxuXHRcdFx0PC9OYXZpZ2F0aW9uPlxyXG5cdFx0PC9XcmFwcGVyPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdih7XHJcblx0aGVpZ2h0OiAnMTAwdmgnLFxyXG5cdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0Z2FwOiAnMTM1cHgnLFxyXG59KTtcclxuXHJcbmNvbnN0IFRpdGxlID0gc3R5bGVkLmgxKHtcclxuXHRmb250U2l6ZTogJzNyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDcwMCxcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcbn0pO1xyXG5cclxuY29uc3QgQXV0aG9yID0gc3R5bGVkLnNwYW4oe1xyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHRmb250U2l6ZTogJzEuNXJlbScsXHJcblx0Zm9udFdlaWdodDogNjAwLFxyXG59KTtcclxuXHJcbmNvbnN0IE5hdmlnYXRpb24gPSBzdHlsZWQubmF2KHtcclxuXHQnJiA+IHVsJzoge1xyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuXHRcdGdhcDogJzMwcHgnLFxyXG5cclxuXHRcdCcmOjpiZWZvcmUnOiB7XHJcblx0XHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdGxlZnQ6ICctMzBweCcsXHJcblx0XHRcdHRvcDogJzEwcHgnLFxyXG5cdFx0XHRib3R0b206ICcxMHB4JyxcclxuXHRcdFx0Ym9yZGVyTGVmdDogYDFweCBzb2xpZCAke3RoZW1lLmNvbG9ycy50ZXh0fWAsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuY29uc3QgU3R5bGVkTGluayA9IHN0eWxlZChOYXZMaW5rKSh7XHJcblx0Y29sb3I6IHRoZW1lLmNvbG9ycy50ZXh0LFxyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cclxuXHQnJjpob3Zlcic6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHR9LFxyXG5cclxuXHQnJjo6YWZ0ZXInOiB7XHJcblx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5jb2xvcnMudGV4dH1gLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHR3aWR0aDogJzEzcHgnLFxyXG5cdFx0aGVpZ2h0OiAnMXB4JyxcclxuXHRcdGxlZnQ6ICctMzZweCcsXHJcblx0XHR0b3A6ICc1MCUnLFxyXG5cdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcblx0fSxcclxuXHJcblx0JyYuYWN0aXZlJzoge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LFxyXG5cclxuXHRcdCcmOjpiZWZvcmUnOiB7XHJcblx0XHRcdGNvbnRlbnQ6ICdcIlwiJyxcclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdHdpZHRoOiAnMTNweCcsXHJcblx0XHRcdGhlaWdodDogJzEzcHgnLFxyXG5cdFx0XHRsZWZ0OiAnLTM2cHgnLFxyXG5cdFx0XHR0b3A6ICc1MCUnLFxyXG5cdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyxcclxuXHRcdFx0ekluZGV4OiAnMScsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFpbjtcclxuIl19 */");
const Navigation = /* @__PURE__ */ _styled("nav", process.env.NODE_ENV === "production" ? {
  target: "eokzd391"
} : {
  target: "eokzd391",
  label: "Navigation"
})({
  "& > ul": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "&::before": {
      content: '""',
      position: "absolute",
      left: "-30px",
      top: "10px",
      bottom: "10px",
      borderLeft: `1px solid ${theme.colors.text}`
    }
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL3BhZ2VzL01haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1EbUIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvcGFnZXMvTWFpbi50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTmF2TGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL3RoZW1lJztcclxuaW1wb3J0IHsgU2VvIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL1Nlbyc7XHJcblxyXG5jb25zdCBNYWluOiBGdW5jdGlvbkNvbXBvbmVudCA9ICgpID0+IHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PFdyYXBwZXI+XHJcblx0XHRcdDxTZW8gdGl0bGU9XCJNYWluXCIgZGVzY3JpcHRpb249XCLshK3snbTsnZgg6rCc67CcIOu4lOuhnOq3uFwiIGF1dGhvcj1cInVpc2VvcFwiIC8+XHJcblx0XHRcdDxoZWFkZXI+XHJcblx0XHRcdFx0PFRpdGxlPkNIVUcgQUxPTkc8L1RpdGxlPlxyXG5cdFx0XHRcdDxBdXRob3I+YnkgU2VvcF9lZTwvQXV0aG9yPlxyXG5cdFx0XHQ8L2hlYWRlcj5cclxuXHRcdFx0PE5hdmlnYXRpb24+XHJcblx0XHRcdFx0PHVsPlxyXG5cdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHQ8U3R5bGVkTGluayB0bz1cIi9cIj5IT01FPC9TdHlsZWRMaW5rPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0PFN0eWxlZExpbmsgdG89XCIvYWJvdXRcIj5BQk9VVDwvU3R5bGVkTGluaz5cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdDxTdHlsZWRMaW5rIHRvPVwiL3Bvc3RzXCI+UE9TVFM8L1N0eWxlZExpbms+XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdDwvdWw+XHJcblx0XHRcdDwvTmF2aWdhdGlvbj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXYoe1xyXG5cdGhlaWdodDogJzEwMHZoJyxcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdGdhcDogJzEzNXB4JyxcclxufSk7XHJcblxyXG5jb25zdCBUaXRsZSA9IHN0eWxlZC5oMSh7XHJcblx0Zm9udFNpemU6ICczcmVtJyxcclxuXHRmb250V2VpZ2h0OiA3MDAsXHJcblx0Y29sb3I6IHRoZW1lLmNvbG9ycy50ZXh0LFxyXG59KTtcclxuXHJcbmNvbnN0IEF1dGhvciA9IHN0eWxlZC5zcGFuKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0Zm9udFNpemU6ICcxLjVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDYwMCxcclxufSk7XHJcblxyXG5jb25zdCBOYXZpZ2F0aW9uID0gc3R5bGVkLm5hdih7XHJcblx0JyYgPiB1bCc6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0ZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcblx0XHRnYXA6ICczMHB4JyxcclxuXHJcblx0XHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHRsZWZ0OiAnLTMwcHgnLFxyXG5cdFx0XHR0b3A6ICcxMHB4JyxcclxuXHRcdFx0Ym90dG9tOiAnMTBweCcsXHJcblx0XHRcdGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHt0aGVtZS5jb2xvcnMudGV4dH1gLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxuXHJcbmNvbnN0IFN0eWxlZExpbmsgPSBzdHlsZWQoTmF2TGluaykoe1xyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMudGV4dCxcclxuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHJcblx0JyY6aG92ZXInOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0fSxcclxuXHJcblx0JyY6OmFmdGVyJzoge1xyXG5cdFx0Y29udGVudDogJ1wiXCInLFxyXG5cdFx0Ym9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuY29sb3JzLnRleHR9YCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6ICcxM3B4JyxcclxuXHRcdGhlaWdodDogJzFweCcsXHJcblx0XHRsZWZ0OiAnLTM2cHgnLFxyXG5cdFx0dG9wOiAnNTAlJyxcclxuXHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxyXG5cdH0sXHJcblxyXG5cdCcmLmFjdGl2ZSc6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHR3aWR0aDogJzEzcHgnLFxyXG5cdFx0XHRoZWlnaHQ6ICcxM3B4JyxcclxuXHRcdFx0bGVmdDogJy0zNnB4JyxcclxuXHRcdFx0dG9wOiAnNTAlJyxcclxuXHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcblx0XHRcdHpJbmRleDogJzEnLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1haW47XHJcbiJdfQ== */");
const StyledLink = /* @__PURE__ */ _styled(NavLink, process.env.NODE_ENV === "production" ? {
  target: "eokzd390"
} : {
  target: "eokzd390",
  label: "StyledLink"
})({
  color: theme.colors.text,
  position: "relative",
  "&:hover": {
    color: theme.colors.primary
  },
  "&::after": {
    content: '""',
    borderBottom: `1px solid ${theme.colors.text}`,
    position: "absolute",
    width: "13px",
    height: "1px",
    left: "-36px",
    top: "50%",
    transform: "translateY(-50%)"
  },
  "&.active": {
    color: theme.colors.primary,
    "&::before": {
      content: '""',
      backgroundColor: theme.colors.primary,
      position: "absolute",
      width: "13px",
      height: "13px",
      left: "-36px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: "1"
    }
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL3BhZ2VzL01haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFFbUIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvcGFnZXMvTWFpbi50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTmF2TGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL3RoZW1lJztcclxuaW1wb3J0IHsgU2VvIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL1Nlbyc7XHJcblxyXG5jb25zdCBNYWluOiBGdW5jdGlvbkNvbXBvbmVudCA9ICgpID0+IHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PFdyYXBwZXI+XHJcblx0XHRcdDxTZW8gdGl0bGU9XCJNYWluXCIgZGVzY3JpcHRpb249XCLshK3snbTsnZgg6rCc67CcIOu4lOuhnOq3uFwiIGF1dGhvcj1cInVpc2VvcFwiIC8+XHJcblx0XHRcdDxoZWFkZXI+XHJcblx0XHRcdFx0PFRpdGxlPkNIVUcgQUxPTkc8L1RpdGxlPlxyXG5cdFx0XHRcdDxBdXRob3I+YnkgU2VvcF9lZTwvQXV0aG9yPlxyXG5cdFx0XHQ8L2hlYWRlcj5cclxuXHRcdFx0PE5hdmlnYXRpb24+XHJcblx0XHRcdFx0PHVsPlxyXG5cdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHQ8U3R5bGVkTGluayB0bz1cIi9cIj5IT01FPC9TdHlsZWRMaW5rPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0PFN0eWxlZExpbmsgdG89XCIvYWJvdXRcIj5BQk9VVDwvU3R5bGVkTGluaz5cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdDxTdHlsZWRMaW5rIHRvPVwiL3Bvc3RzXCI+UE9TVFM8L1N0eWxlZExpbms+XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdDwvdWw+XHJcblx0XHRcdDwvTmF2aWdhdGlvbj5cclxuXHRcdDwvV3JhcHBlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXYoe1xyXG5cdGhlaWdodDogJzEwMHZoJyxcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdGdhcDogJzEzNXB4JyxcclxufSk7XHJcblxyXG5jb25zdCBUaXRsZSA9IHN0eWxlZC5oMSh7XHJcblx0Zm9udFNpemU6ICczcmVtJyxcclxuXHRmb250V2VpZ2h0OiA3MDAsXHJcblx0Y29sb3I6IHRoZW1lLmNvbG9ycy50ZXh0LFxyXG59KTtcclxuXHJcbmNvbnN0IEF1dGhvciA9IHN0eWxlZC5zcGFuKHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0Zm9udFNpemU6ICcxLjVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDYwMCxcclxufSk7XHJcblxyXG5jb25zdCBOYXZpZ2F0aW9uID0gc3R5bGVkLm5hdih7XHJcblx0JyYgPiB1bCc6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0ZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcblx0XHRnYXA6ICczMHB4JyxcclxuXHJcblx0XHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHRsZWZ0OiAnLTMwcHgnLFxyXG5cdFx0XHR0b3A6ICcxMHB4JyxcclxuXHRcdFx0Ym90dG9tOiAnMTBweCcsXHJcblx0XHRcdGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHt0aGVtZS5jb2xvcnMudGV4dH1gLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxuXHJcbmNvbnN0IFN0eWxlZExpbmsgPSBzdHlsZWQoTmF2TGluaykoe1xyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMudGV4dCxcclxuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHJcblx0JyY6aG92ZXInOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0fSxcclxuXHJcblx0JyY6OmFmdGVyJzoge1xyXG5cdFx0Y29udGVudDogJ1wiXCInLFxyXG5cdFx0Ym9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuY29sb3JzLnRleHR9YCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6ICcxM3B4JyxcclxuXHRcdGhlaWdodDogJzFweCcsXHJcblx0XHRsZWZ0OiAnLTM2cHgnLFxyXG5cdFx0dG9wOiAnNTAlJyxcclxuXHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxyXG5cdH0sXHJcblxyXG5cdCcmLmFjdGl2ZSc6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeSxcclxuXHJcblx0XHQnJjo6YmVmb3JlJzoge1xyXG5cdFx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnksXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHR3aWR0aDogJzEzcHgnLFxyXG5cdFx0XHRoZWlnaHQ6ICcxM3B4JyxcclxuXHRcdFx0bGVmdDogJy0zNnB4JyxcclxuXHRcdFx0dG9wOiAnNTAlJyxcclxuXHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcblx0XHRcdHpJbmRleDogJzEnLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1haW47XHJcbiJdfQ== */");

const WORDS = ["지속가능한 소프트웨어를 만드는", "열정이 가득한", "즐겁게 일하는", "함께 성장하는"];
const writeSpeed = 100;
const deleteSpeed = 50;
const changeWordSpeed = 1e3;
const Description = () => {
  const cursorRef = useRef(null);
  let timer;
  let wordIndex = useRef(0);
  let charIndex = useRef(1);
  let isDeleting = useRef(false);
  useEffect(() => {
    if (cursorRef.current) {
      timer = setTimeout(typeEffect, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);
  function typeEffect() {
    const currentWord = WORDS[wordIndex.current];
    const currentChar = currentWord.slice(0, charIndex.current);
    cursorRef.current.textContent = currentChar;
    if (!isDeleting.current && charIndex.current < currentWord.length) {
      charIndex.current += 1;
      timer = setTimeout(typeEffect, writeSpeed);
    } else if (isDeleting.current && charIndex.current > 0) {
      charIndex.current -= 1;
      timer = setTimeout(typeEffect, deleteSpeed);
    } else {
      isDeleting.current = !isDeleting.current;
      wordIndex.current = !isDeleting.current ? (wordIndex.current + 1) % WORDS.length : wordIndex.current;
      timer = setTimeout(typeEffect, changeWordSpeed);
    }
  }
  return /* @__PURE__ */ jsxs("p", { children: [
    "안녕하세요.",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(CursorSpan, { ref: cursorRef }),
    /* @__PURE__ */ jsx("br", {}),
    "개발자 ",
    /* @__PURE__ */ jsx("strong", { children: "이의섭" }),
    "입니다."
  ] });
};
const blink = keyframes`
	50% {
		opacity: 0;
	}
`;
const CursorSpan = /* @__PURE__ */ _styled("span", process.env.NODE_ENV === "production" ? {
  target: "e1bi8wra0"
} : {
  target: "e1bi8wra0",
  label: "CursorSpan"
})({
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    right: "-6px",
    height: "3rem",
    backgroundColor: theme.colors.background,
    borderLeft: `3px solid ${theme.colors.text}`,
    borderRadius: "3px",
    animation: `${blink} 0.7s infinite`
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvQWJvdXQvRGVzY3JpcHRpb24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFFbUIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9BYm91dC9EZXNjcmlwdGlvbi50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyB0aGVtZSB9IGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi90aGVtZSc7XHJcblxyXG5jb25zdCBXT1JEUyA9IFtcclxuXHQn7KeA7IaN6rCA64ql7ZWcIOyGjO2UhO2KuOybqOyWtOulvCDrp4zrk5zripQnLFxyXG5cdCfsl7TsoJXsnbQg6rCA65Od7ZWcJyxcclxuXHQn7KaQ6rKB6rKMIOydvO2VmOuKlCcsXHJcblx0J+2VqOq7mCDshLHsnqXtlZjripQnLFxyXG5dO1xyXG5cclxuY29uc3Qgd3JpdGVTcGVlZCA9IDEwMDtcclxuY29uc3QgZGVsZXRlU3BlZWQgPSA1MDtcclxuY29uc3QgY2hhbmdlV29yZFNwZWVkID0gMTAwMDtcclxuXHJcbmV4cG9ydCBjb25zdCBEZXNjcmlwdGlvbjogRnVuY3Rpb25Db21wb25lbnQgPSAoKSA9PiB7XHJcblx0Y29uc3QgY3Vyc29yUmVmID0gdXNlUmVmPEhUTUxTcGFuRWxlbWVudD4obnVsbCk7XHJcblx0bGV0IHRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcclxuXHRsZXQgd29yZEluZGV4ID0gdXNlUmVmKDApO1xyXG5cdGxldCBjaGFySW5kZXggPSB1c2VSZWYoMSk7XHJcblx0bGV0IGlzRGVsZXRpbmcgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuXHR1c2VFZmZlY3QoKCkgPT4ge1xyXG5cdFx0aWYgKGN1cnNvclJlZi5jdXJyZW50KSB7XHJcblx0XHRcdHRpbWVyID0gc2V0VGltZW91dCh0eXBlRWZmZWN0LCA1MDApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuICgpID0+IHtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuXHRcdH07XHJcblx0fSwgW10pO1xyXG5cclxuXHRmdW5jdGlvbiB0eXBlRWZmZWN0KCkge1xyXG5cdFx0Y29uc3QgY3VycmVudFdvcmQgPSBXT1JEU1t3b3JkSW5kZXguY3VycmVudF07XHJcblx0XHRjb25zdCBjdXJyZW50Q2hhciA9IGN1cnJlbnRXb3JkLnNsaWNlKDAsIGNoYXJJbmRleC5jdXJyZW50KTtcclxuXHRcdGN1cnNvclJlZi5jdXJyZW50IS50ZXh0Q29udGVudCA9IGN1cnJlbnRDaGFyO1xyXG5cclxuXHRcdGlmICghaXNEZWxldGluZy5jdXJyZW50ICYmIGNoYXJJbmRleC5jdXJyZW50IDwgY3VycmVudFdvcmQubGVuZ3RoKSB7XHJcblx0XHRcdGNoYXJJbmRleC5jdXJyZW50ICs9IDE7XHJcblx0XHRcdHRpbWVyID0gc2V0VGltZW91dCh0eXBlRWZmZWN0LCB3cml0ZVNwZWVkKTtcclxuXHRcdH0gZWxzZSBpZiAoaXNEZWxldGluZy5jdXJyZW50ICYmIGNoYXJJbmRleC5jdXJyZW50ID4gMCkge1xyXG5cdFx0XHRjaGFySW5kZXguY3VycmVudCAtPSAxO1xyXG5cdFx0XHR0aW1lciA9IHNldFRpbWVvdXQodHlwZUVmZmVjdCwgZGVsZXRlU3BlZWQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aXNEZWxldGluZy5jdXJyZW50ID0gIWlzRGVsZXRpbmcuY3VycmVudDtcclxuXHRcdFx0d29yZEluZGV4LmN1cnJlbnQgPSAhaXNEZWxldGluZy5jdXJyZW50XHJcblx0XHRcdFx0PyAod29yZEluZGV4LmN1cnJlbnQgKyAxKSAlIFdPUkRTLmxlbmd0aFxyXG5cdFx0XHRcdDogd29yZEluZGV4LmN1cnJlbnQ7XHJcblx0XHRcdHRpbWVyID0gc2V0VGltZW91dCh0eXBlRWZmZWN0LCBjaGFuZ2VXb3JkU3BlZWQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxwPlxyXG5cdFx0XHTslYjrhZXtlZjshLjsmpQuXHJcblx0XHRcdDxiciAvPlxyXG5cdFx0XHQ8Q3Vyc29yU3BhbiByZWY9e2N1cnNvclJlZn0gLz5cclxuXHRcdFx0PGJyIC8+XHJcblx0XHRcdOqwnOuwnOyekCA8c3Ryb25nPuydtOydmOyErTwvc3Ryb25nPuyeheuLiOuLpC5cclxuXHRcdDwvcD5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgYmxpbmsgPSBrZXlmcmFtZXNgXHJcblx0NTAlIHtcclxuXHRcdG9wYWNpdHk6IDA7XHJcblx0fVxyXG5gO1xyXG5cclxuY29uc3QgQ3Vyc29yU3BhbiA9IHN0eWxlZC5zcGFuKHtcclxuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHQnJjo6YWZ0ZXInOiB7XHJcblx0XHRjb250ZW50OiAnXCJcIicsXHJcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHRcdHJpZ2h0OiAnLTZweCcsXHJcblx0XHRoZWlnaHQ6ICczcmVtJyxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmJhY2tncm91bmQsXHJcblx0XHRib3JkZXJMZWZ0OiBgM3B4IHNvbGlkICR7dGhlbWUuY29sb3JzLnRleHR9YCxcclxuXHRcdGJvcmRlclJhZGl1czogJzNweCcsXHJcblx0XHRhbmltYXRpb246IGAke2JsaW5rfSAwLjdzIGluZmluaXRlYCxcclxuXHR9LFxyXG59KTtcclxuIl19 */");

function _EMOTION_STRINGIFIED_CSS_ERROR__$1() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const SocialLinks = () => {
  return /* @__PURE__ */ jsxs(ListWrapper, { children: [
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsxs(StlyedAnchor, { target: "blank", href: "https://github.com/uiseop", children: [
        /* @__PURE__ */ jsx(FontAwesomeIcon, { width: 30, icon: faGithub }),
        /* @__PURE__ */ jsx("span", { children: "github" })
      ] }),
      /* @__PURE__ */ jsx(Tip, { children: "github" })
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsxs(StlyedAnchor, { href: "mailto:bono521@naver.com", children: [
        /* @__PURE__ */ jsx(FontAwesomeIcon, { width: 30, icon: faAt }),
        /* @__PURE__ */ jsx("span", { children: "github" })
      ] }),
      /* @__PURE__ */ jsx(Tip, { children: "email" })
    ] })
  ] });
};
const ListWrapper = /* @__PURE__ */ _styled("ul", process.env.NODE_ENV === "production" ? {
  target: "e1r5xu3w1"
} : {
  target: "e1r5xu3w1",
  label: "ListWrapper"
})(process.env.NODE_ENV === "production" ? {
  name: "h0cnuh",
  styles: "display:flex;justify-content:flex-start;align-items:center;margin-top:14px;gap:6px;& > li{position:relative;}"
} : {
  name: "h0cnuh",
  styles: "display:flex;justify-content:flex-start;align-items:center;margin-top:14px;gap:6px;& > li{position:relative;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvQWJvdXQvU29jaWFsTGlua3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThCb0IiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9BYm91dC9Tb2NpYWxMaW5rcy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmYUdpdGh1YiB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLWJyYW5kcy1zdmctaWNvbnMnO1xyXG5pbXBvcnQgeyBmYUF0IH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcclxuaW1wb3J0IHsgRm9udEF3ZXNvbWVJY29uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJztcclxuaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL3RoZW1lJztcclxuaW1wb3J0IHsgYmxpbmQgfSBmcm9tICdAY29tcG9uZW50cy9zdHlsZXMvYmxpbmQnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBUaXAgZnJvbSAnQGNvbXBvbmVudHMvc3R5bGVzL2NvbXBvbmVudHMvVGlwJztcclxuXHJcbmV4cG9ydCBjb25zdCBTb2NpYWxMaW5rczogRnVuY3Rpb25Db21wb25lbnQgPSAoKSA9PiB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxMaXN0V3JhcHBlcj5cclxuXHRcdFx0PGxpPlxyXG5cdFx0XHRcdDxTdGx5ZWRBbmNob3IgdGFyZ2V0PVwiYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3Vpc2VvcFwiPlxyXG5cdFx0XHRcdFx0PEZvbnRBd2Vzb21lSWNvbiB3aWR0aD17MzB9IGljb249e2ZhR2l0aHVifSAvPlxyXG5cdFx0XHRcdFx0PHNwYW4+Z2l0aHViPC9zcGFuPlxyXG5cdFx0XHRcdDwvU3RseWVkQW5jaG9yPlxyXG5cdFx0XHRcdDxUaXA+Z2l0aHViPC9UaXA+XHJcblx0XHRcdDwvbGk+XHJcblx0XHRcdDxsaT5cclxuXHRcdFx0XHQ8U3RseWVkQW5jaG9yIGhyZWY9XCJtYWlsdG86Ym9ubzUyMUBuYXZlci5jb21cIj5cclxuXHRcdFx0XHRcdDxGb250QXdlc29tZUljb24gd2lkdGg9ezMwfSBpY29uPXtmYUF0fSAvPlxyXG5cdFx0XHRcdFx0PHNwYW4+Z2l0aHViPC9zcGFuPlxyXG5cdFx0XHRcdDwvU3RseWVkQW5jaG9yPlxyXG5cdFx0XHRcdDxUaXA+ZW1haWw8L1RpcD5cclxuXHRcdFx0PC9saT5cclxuXHRcdDwvTGlzdFdyYXBwZXI+XHJcblx0KTtcclxufTtcclxuXHJcbmNvbnN0IExpc3RXcmFwcGVyID0gc3R5bGVkLnVsKHtcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRtYXJnaW5Ub3A6ICcxNHB4JyxcclxuXHRnYXA6ICc2cHgnLFxyXG5cclxuXHQnJiA+IGxpJzoge1xyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxufSk7XHJcblxyXG5jb25zdCBTdGx5ZWRBbmNob3IgPSBzdHlsZWQuYSh7XHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdHBhZGRpbmc6ICc1cHgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbixcclxuXHR0cmFuc2l0aW9uOiAnYmFja2dyb3VuZC1jb2xvciAwLjRzIGVhc2UnLFxyXG5cclxuXHQnJjpob3Zlcic6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmFib3V0TGlua0ljb25Ib3ZlcixcclxuXHJcblx0XHQnJiArIGRpdic6IHtcclxuXHRcdFx0dmlzaWJpbGl0eTogJ3Zpc2libGUnLFxyXG5cdFx0XHRvcGFjaXR5OiAxLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHN2Zyc6IHtcclxuXHRcdGhlaWdodDogJzMwcHgnLFxyXG5cdH0sXHJcblxyXG5cdCcmID4gc3Bhbic6IHsgLi4uYmxpbmQgfSxcclxufSk7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
});
const StlyedAnchor = /* @__PURE__ */ _styled("a", process.env.NODE_ENV === "production" ? {
  target: "e1r5xu3w0"
} : {
  target: "e1r5xu3w0",
  label: "StlyedAnchor"
})({
  display: "flex",
  padding: "5px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  color: theme.colors.aboutLinkIcon,
  transition: "background-color 0.4s ease",
  "&:hover": {
    backgroundColor: theme.colors.aboutLinkIconHover,
    "& + div": {
      visibility: "visible",
      opacity: 1
    }
  },
  "& > svg": {
    height: "30px"
  },
  "& > span": {
    ...blind
  }
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL2NvbXBvbmVudHMvQWJvdXQvU29jaWFsTGlua3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBDcUIiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvY29tcG9uZW50cy9BYm91dC9Tb2NpYWxMaW5rcy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmYUdpdGh1YiB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLWJyYW5kcy1zdmctaWNvbnMnO1xyXG5pbXBvcnQgeyBmYUF0IH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcclxuaW1wb3J0IHsgRm9udEF3ZXNvbWVJY29uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJztcclxuaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL3RoZW1lJztcclxuaW1wb3J0IHsgYmxpbmQgfSBmcm9tICdAY29tcG9uZW50cy9zdHlsZXMvYmxpbmQnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCBUaXAgZnJvbSAnQGNvbXBvbmVudHMvc3R5bGVzL2NvbXBvbmVudHMvVGlwJztcclxuXHJcbmV4cG9ydCBjb25zdCBTb2NpYWxMaW5rczogRnVuY3Rpb25Db21wb25lbnQgPSAoKSA9PiB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxMaXN0V3JhcHBlcj5cclxuXHRcdFx0PGxpPlxyXG5cdFx0XHRcdDxTdGx5ZWRBbmNob3IgdGFyZ2V0PVwiYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3Vpc2VvcFwiPlxyXG5cdFx0XHRcdFx0PEZvbnRBd2Vzb21lSWNvbiB3aWR0aD17MzB9IGljb249e2ZhR2l0aHVifSAvPlxyXG5cdFx0XHRcdFx0PHNwYW4+Z2l0aHViPC9zcGFuPlxyXG5cdFx0XHRcdDwvU3RseWVkQW5jaG9yPlxyXG5cdFx0XHRcdDxUaXA+Z2l0aHViPC9UaXA+XHJcblx0XHRcdDwvbGk+XHJcblx0XHRcdDxsaT5cclxuXHRcdFx0XHQ8U3RseWVkQW5jaG9yIGhyZWY9XCJtYWlsdG86Ym9ubzUyMUBuYXZlci5jb21cIj5cclxuXHRcdFx0XHRcdDxGb250QXdlc29tZUljb24gd2lkdGg9ezMwfSBpY29uPXtmYUF0fSAvPlxyXG5cdFx0XHRcdFx0PHNwYW4+Z2l0aHViPC9zcGFuPlxyXG5cdFx0XHRcdDwvU3RseWVkQW5jaG9yPlxyXG5cdFx0XHRcdDxUaXA+ZW1haWw8L1RpcD5cclxuXHRcdFx0PC9saT5cclxuXHRcdDwvTGlzdFdyYXBwZXI+XHJcblx0KTtcclxufTtcclxuXHJcbmNvbnN0IExpc3RXcmFwcGVyID0gc3R5bGVkLnVsKHtcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0anVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRtYXJnaW5Ub3A6ICcxNHB4JyxcclxuXHRnYXA6ICc2cHgnLFxyXG5cclxuXHQnJiA+IGxpJzoge1xyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxufSk7XHJcblxyXG5jb25zdCBTdGx5ZWRBbmNob3IgPSBzdHlsZWQuYSh7XHJcblx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdHBhZGRpbmc6ICc1cHgnLFxyXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMuYWJvdXRMaW5rSWNvbixcclxuXHR0cmFuc2l0aW9uOiAnYmFja2dyb3VuZC1jb2xvciAwLjRzIGVhc2UnLFxyXG5cclxuXHQnJjpob3Zlcic6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLmFib3V0TGlua0ljb25Ib3ZlcixcclxuXHJcblx0XHQnJiArIGRpdic6IHtcclxuXHRcdFx0dmlzaWJpbGl0eTogJ3Zpc2libGUnLFxyXG5cdFx0XHRvcGFjaXR5OiAxLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQnJiA+IHN2Zyc6IHtcclxuXHRcdGhlaWdodDogJzMwcHgnLFxyXG5cdH0sXHJcblxyXG5cdCcmID4gc3Bhbic6IHsgLi4uYmxpbmQgfSxcclxufSk7XHJcbiJdfQ== */");

const About = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Seo, { title: "About", description: "나를 소개합니다", author: "uiseop" }),
    /* @__PURE__ */ jsx(Header$1, {}),
    /* @__PURE__ */ jsxs(Wrapper$1, { children: [
      /* @__PURE__ */ jsx(Description, {}),
      /* @__PURE__ */ jsx(SocialLinks, {})
    ] })
  ] });
};
const Wrapper$1 = /* @__PURE__ */ _styled("main", process.env.NODE_ENV === "production" ? {
  target: "e1hrt07u0"
} : {
  target: "e1hrt07u0",
  label: "Wrapper"
})({
  width: "100%",
  maxWidth: "720px",
  margin: "120px 0",
  display: "flex",
  flexDirection: "column",
  fontSize: "2.5rem",
  fontWeight: 300,
  color: theme.colors.text
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL3BhZ2VzL0Fib3V0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQmdCIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL3BhZ2VzL0Fib3V0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL3RoZW1lJztcclxuaW1wb3J0IHsgRGVzY3JpcHRpb24sIFNvY2lhbExpbmtzIH0gZnJvbSAnQGNvbXBvbmVudHMvQWJvdXQnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24nO1xyXG5pbXBvcnQgeyBTZW8gfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vU2VvJztcclxuXHJcbmNvbnN0IEFib3V0OiBGdW5jdGlvbkNvbXBvbmVudCA9ICgpID0+IHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PD5cclxuXHRcdFx0PFNlbyB0aXRsZT1cIkFib3V0XCIgZGVzY3JpcHRpb249XCLrgpjrpbwg7IaM6rCc7ZWp64uI64ukXCIgYXV0aG9yPVwidWlzZW9wXCIgLz5cclxuXHRcdFx0PEhlYWRlciAvPlxyXG5cdFx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0XHQ8RGVzY3JpcHRpb24gLz5cclxuXHRcdFx0XHQ8U29jaWFsTGlua3MgLz5cclxuXHRcdFx0PC9XcmFwcGVyPlxyXG5cdFx0PC8+XHJcblx0KTtcclxufTtcclxuXHJcbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQubWFpbih7XHJcblx0d2lkdGg6ICcxMDAlJyxcclxuXHRtYXhXaWR0aDogJzcyMHB4JyxcclxuXHRtYXJnaW46ICcxMjBweCAwJyxcclxuXHRkaXNwbGF5OiAnZmxleCcsXHJcblx0ZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcblx0Zm9udFNpemU6ICcyLjVyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDMwMCxcclxuXHRjb2xvcjogdGhlbWUuY29sb3JzLnRleHQsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWJvdXQ7XHJcbiJdfQ== */");

const categorySet = new Set();
const filesInfo = {
  files: [],
  getCategories: () => {
    return Array.from(categorySet);
  }
};
if (typeof process !== 'undefined') {
  // Node.js 환경 -> readFileSync 사용
  filesInfo.files = [fs.readFileSync('src/static/React_개발블로그_배포기_(Feat_GitHubPages).md', 'utf-8', (err, data) => {
    if (err) {
      return;
    }
    addCategory(data);
    return data;
  }), fs.readFileSync('src/static/헤드리스_컴포넌트_클린코드_접근법.md', 'utf-8', (err, data) => {
    if (err) {
      return;
    }
    addCategory(data);
    return data;
  })];
} else {
  const deploy = await import('./assets/React_개발블로그_배포기_(Feat_GitHubPages)-UxM7vLdo.js');
  const test = await import('./assets/헤드리스_컴포넌트_클린코드_접근법-23kkF0Lh.js');
  filesInfo.files = [deploy, test];
}
function addCategory(file) {
  const {
    data
  } = matter(file);
  data.categories.forEach(category => categorySet.add(category));
}

const files = [...filesInfo.files].sort((a, b) => {
  const {
    data: {
      date: aDate
    }
  } = matter(a);
  const {
    data: {
      date: bDate
    }
  } = matter(b);
  return compareTimes(aDate, bDate);
}).map((file, idx) => ({
  file,
  key: idx
}));
const categories = filesInfo.getCategories();

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
const Posts = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Seo, { title: "Posts", description: "섭이의 개발 블로그", author: "uiseop" }),
    /* @__PURE__ */ jsx(Header$1, {}),
    /* @__PURE__ */ jsxs(Wrapper, { children: [
      /* @__PURE__ */ jsx(Navigationbar, { categories }),
      /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsx(PostList, { files }) })
    ] })
  ] });
};
const Wrapper = /* @__PURE__ */ _styled("div", process.env.NODE_ENV === "production" ? {
  target: "ehvt2nb1"
} : {
  target: "ehvt2nb1",
  label: "Wrapper"
})({
  marginTop: "60px",
  maxWidth: "720px",
  width: "100%",
  color: theme.colors.text
}, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL3BhZ2VzL1Bvc3RzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQmdCIiwiZmlsZSI6IlM6L3JlYWN0LWluaXQvc3JjL3BhZ2VzL1Bvc3RzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vdGhlbWUnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uYmFyLCBQb3N0TGlzdCB9IGZyb20gJ0Bjb21wb25lbnRzL1Bvc3RzJztcclxuaW1wb3J0IHsgSGVhZGVyIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL0hlYWRlcic7XHJcbmltcG9ydCB7IGNhdGVnb3JpZXMsIGZpbGVzIH0gZnJvbSAnQHN0YXRpYy9pbmRleCc7XHJcbmltcG9ydCB7IFNlbyB9IGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi9TZW8nO1xyXG5cclxuY29uc3QgUG9zdHMgPSAoKSA9PiB7XHJcblx0cmV0dXJuIChcclxuXHRcdDw+XHJcblx0XHRcdDxTZW8gdGl0bGU9XCJQb3N0c1wiIGRlc2NyaXB0aW9uPVwi7ISt7J207J2YIOqwnOuwnCDruJTroZzqt7hcIiBhdXRob3I9XCJ1aXNlb3BcIiAvPlxyXG5cdFx0XHQ8SGVhZGVyIC8+XHJcblx0XHRcdDxXcmFwcGVyPlxyXG5cdFx0XHRcdDxOYXZpZ2F0aW9uYmFyIGNhdGVnb3JpZXM9e2NhdGVnb3JpZXN9IC8+XHJcblx0XHRcdFx0PE1haW4+XHJcblx0XHRcdFx0XHQ8UG9zdExpc3QgZmlsZXM9e2ZpbGVzfSAvPlxyXG5cdFx0XHRcdDwvTWFpbj5cclxuXHRcdFx0PC9XcmFwcGVyPlxyXG5cdFx0PC8+XHJcblx0KTtcclxufTtcclxuXHJcbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2KHtcclxuXHRtYXJnaW5Ub3A6ICc2MHB4JyxcclxuXHRtYXhXaWR0aDogJzcyMHB4JyxcclxuXHR3aWR0aDogJzEwMCUnLFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvcnMudGV4dCxcclxufSk7XHJcblxyXG5jb25zdCBNYWluID0gc3R5bGVkLm1haW4oe1xyXG5cdG1hcmdpblRvcDogJzE1cHgnLFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBvc3RzO1xyXG4iXX0= */");
const Main = /* @__PURE__ */ _styled("main", process.env.NODE_ENV === "production" ? {
  target: "ehvt2nb0"
} : {
  target: "ehvt2nb0",
  label: "Main"
})(process.env.NODE_ENV === "production" ? {
  name: "5bno9i",
  styles: "margin-top:15px"
} : {
  name: "5bno9i",
  styles: "margin-top:15px",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlM6L3JlYWN0LWluaXQvc3JjL3BhZ2VzL1Bvc3RzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QmEiLCJmaWxlIjoiUzovcmVhY3QtaW5pdC9zcmMvcGFnZXMvUG9zdHMudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyB0aGVtZSB9IGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi90aGVtZSc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25iYXIsIFBvc3RMaXN0IH0gZnJvbSAnQGNvbXBvbmVudHMvUG9zdHMnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vSGVhZGVyJztcclxuaW1wb3J0IHsgY2F0ZWdvcmllcywgZmlsZXMgfSBmcm9tICdAc3RhdGljL2luZGV4JztcclxuaW1wb3J0IHsgU2VvIH0gZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL1Nlbyc7XHJcblxyXG5jb25zdCBQb3N0cyA9ICgpID0+IHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PD5cclxuXHRcdFx0PFNlbyB0aXRsZT1cIlBvc3RzXCIgZGVzY3JpcHRpb249XCLshK3snbTsnZgg6rCc67CcIOu4lOuhnOq3uFwiIGF1dGhvcj1cInVpc2VvcFwiIC8+XHJcblx0XHRcdDxIZWFkZXIgLz5cclxuXHRcdFx0PFdyYXBwZXI+XHJcblx0XHRcdFx0PE5hdmlnYXRpb25iYXIgY2F0ZWdvcmllcz17Y2F0ZWdvcmllc30gLz5cclxuXHRcdFx0XHQ8TWFpbj5cclxuXHRcdFx0XHRcdDxQb3N0TGlzdCBmaWxlcz17ZmlsZXN9IC8+XHJcblx0XHRcdFx0PC9NYWluPlxyXG5cdFx0XHQ8L1dyYXBwZXI+XHJcblx0XHQ8Lz5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXYoe1xyXG5cdG1hcmdpblRvcDogJzYwcHgnLFxyXG5cdG1heFdpZHRoOiAnNzIwcHgnLFxyXG5cdHdpZHRoOiAnMTAwJScsXHJcblx0Y29sb3I6IHRoZW1lLmNvbG9ycy50ZXh0LFxyXG59KTtcclxuXHJcbmNvbnN0IE1haW4gPSBzdHlsZWQubWFpbih7XHJcblx0bWFyZ2luVG9wOiAnMTVweCcsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9zdHM7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

const Post = () => {
  let {
    state
  } = useLocation();
  if (!state) {
    const {
      postId
    } = useParams();
    state = {
      markdown: files[parseInt(postId)].file
    };
  }
  const {
    data
  } = matter(state.markdown);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Seo, { title: data.title, description: data.summary, author: data.author }),
    /* @__PURE__ */ jsx(Header$1, {}),
    /* @__PURE__ */ jsx(MarkdownRednerer, { markdown: state.markdown })
  ] });
};

const Routes = () => {
  return /* @__PURE__ */ jsx(Routes$1, { children: /* @__PURE__ */ jsxs(Route, { path: "/", Component: Template, children: [
    /* @__PURE__ */ jsx(Route, { index: true, Component: Main$1 }),
    /* @__PURE__ */ jsx(Route, { path: "/about", Component: About }),
    /* @__PURE__ */ jsx(Route, { path: "/:postId", Component: Post }),
    /* @__PURE__ */ jsx(Route, { path: "/posts", Component: Posts, children: /* @__PURE__ */ jsx(Route, { path: ":category", Component: Posts }) })
  ] }) });
};

const App = () => {
  return /* @__PURE__ */ jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsx(GlobalStyle, {}),
    /* @__PURE__ */ jsx(Routes, {}),
    /* @__PURE__ */ jsx(ThemeToggler, {}),
    /* @__PURE__ */ jsx(ToastContainer, {})
  ] });
};

function render(url) {
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(/* @__PURE__ */ jsx(React3.StrictMode, { children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) }) }));
  const {
    title,
    meta
  } = helmetContext.helmet || {};
  return {
    html,
    head: `${title}${meta}`
  };
}

export { render };
