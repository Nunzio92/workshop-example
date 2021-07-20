import { createAction, props } from '@ngrx/store';


// <------------------------ NATIVE ACTION SCROLLING ---------------------------------->
export const scrollUp = createAction(
    '[NATIVE_ACTION] SCROLL_UP',
    props<{ yOffset: number }>()
);
export const scrollDown = createAction(
    '[NATIVE_ACTION] SCROLL_DOWN',
    props<{ yOffset: number }>()
);


export const startLoading = createAction(
    '[Spinner] START_LOADING'
);

export const stopLoading = createAction(
    '[Spinner] STOP_LOADING'
);

export const noOp = createAction(
    '[GENERIC] NOOP'
);

export const navigationEnd = createAction(
    '[ROUTER] NAVIGATION_END',
    props<{ url: string }>()
);
export const sanitizedNavigationEnd = createAction(
  '[ROUTER] sanitized_navigation_end',
  props<{ url: string }>()
);

export const prodProtection = createAction(
  '[PROD_MODE] sanitized_action',
  props<{ actionName: string }>()
);


export const errorThrowing = createAction(
    '[ERROR_THROWING] ERROR_TROW',
    props<{ message?: string, statusCode?: string, title?: string, customMessage?: string, fromActionType?: string, redirectOnCloseUrl?: string[] }>()
);


// <------------------------ HEADER  ACTION ---------------------------------->
export const hideHeader = createAction(
    '[HEADER] HIDE_HEADER',
);
export const normalBehaviourHeader = createAction(
    '[HEADER] NORMAL_BEHAVIOUR_HEADER'
);
