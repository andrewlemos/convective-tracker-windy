const __pluginConfig =  {
  "name": "windy-plugin-convective-tracker",
  "version": "1.0.0",
  "icon": "⚡",
  "title": "Convective Formation Tracker",
  "description": "Tracker para monitorar e prever deslocamento de formações convectivas",
  "author": "Andrew Lemos",
  "desktopUI": "rhpane",
  "mobileUI": "fullscreen",
  "desktopWidth": 450,
  "addToContextmenu": true,
  "routerPath": "/convective-tracker/:lat?/:lon?",
  "listenToSingleclick": true,
  "built": 1765232615368,
  "builtReadable": "2025-12-08T22:23:35.368Z",
  "screenshot": "screenshot.jpg"
};

// transformCode: import { singleclick } from '@windy/singleclick';
const { singleclick } = W.singleclick;

// transformCode: import { map, markers } from '@windy/map';
const { map, markers } = W.map;


/** @returns {void} */
function noop() {}

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
	return typeof thing === 'function';
}

/** @returns {boolean} */
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

/** @returns {boolean} */
function is_empty(obj) {
	return Object.keys(obj).length === 0;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append(target, node) {
	target.appendChild(node);
}

/**
 * @param {Node} target
 * @param {string} style_sheet_id
 * @param {string} styles
 * @returns {void}
 */
function append_styles(target, style_sheet_id, styles) {
	const append_styles_to = get_root_for_style(target);
	if (!append_styles_to.getElementById(style_sheet_id)) {
		const style = element('style');
		style.id = style_sheet_id;
		style.textContent = styles;
		append_stylesheet(append_styles_to, style);
	}
}

/**
 * @param {Node} node
 * @returns {ShadowRoot | Document}
 */
function get_root_for_style(node) {
	if (!node) return document;
	const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
	if (root && /** @type {ShadowRoot} */ (root).host) {
		return /** @type {ShadowRoot} */ (root);
	}
	return node.ownerDocument;
}

/**
 * @param {ShadowRoot | Document} node
 * @param {HTMLStyleElement} style
 * @returns {CSSStyleSheet}
 */
function append_stylesheet(node, style) {
	append(/** @type {Document} */ (node).head || node, style);
	return style.sheet;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert(target, node, anchor) {
	target.insertBefore(node, anchor || null);
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach(node) {
	if (node.parentNode) {
		node.parentNode.removeChild(node);
	}
}

/**
 * @returns {void} */
function destroy_each(iterations, detaching) {
	for (let i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detaching);
	}
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */
function element(name) {
	return document.createElement(name);
}

/**
 * @param {string} data
 * @returns {Text}
 */
function text(data) {
	return document.createTextNode(data);
}

/**
 * @returns {Text} */
function space() {
	return text(' ');
}

/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */
function listen(node, event, handler, options) {
	node.addEventListener(event, handler, options);
	return () => node.removeEventListener(event, handler, options);
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr(node, attribute, value) {
	if (value == null) node.removeAttribute(attribute);
	else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

/** @returns {number} */
function to_number(value) {
	return value === '' ? null : +value;
}

/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */
function children(element) {
	return Array.from(element.childNodes);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data(text, data) {
	data = '' + data;
	if (text.data === data) return;
	text.data = /** @type {string} */ (data);
}

/**
 * @returns {void} */
function set_input_value(input, value) {
	input.value = value == null ? '' : value;
}

/**
 * @returns {void} */
function set_style(node, key, value, important) {
	{
		node.style.setProperty(key, value, '');
	}
}

/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */

/** @typedef {ChildNode & NodeEx} ChildNodeEx */

/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

function get_current_component() {
	if (!current_component) throw new Error('Function called outside component initialization');
	return current_component;
}

/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
 *
 * `onMount` does not run inside a [server-side component](https://svelte.dev/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs/svelte#onmount
 * @template T
 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
 * @returns {void}
 */
function onMount(fn) {
	get_current_component().$$.on_mount.push(fn);
}

/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs/svelte#ondestroy
 * @param {() => any} fn
 * @returns {void}
 */
function onDestroy(fn) {
	get_current_component().$$.on_destroy.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];

let render_callbacks = [];

const flush_callbacks = [];

const resolved_promise = /* @__PURE__ */ Promise.resolve();

let update_scheduled = false;

/** @returns {void} */
function schedule_update() {
	if (!update_scheduled) {
		update_scheduled = true;
		resolved_promise.then(flush);
	}
}

/** @returns {void} */
function add_render_callback(fn) {
	render_callbacks.push(fn);
}

// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();

let flushidx = 0; // Do *not* move this inside the flush() function

/** @returns {void} */
function flush() {
	// Do not reenter flush while dirty components are updated, as this can
	// result in an infinite loop. Instead, let the inner flush handle it.
	// Reentrancy is ok afterwards for bindings etc.
	if (flushidx !== 0) {
		return;
	}
	const saved_component = current_component;
	do {
		// first, call beforeUpdate functions
		// and update components
		try {
			while (flushidx < dirty_components.length) {
				const component = dirty_components[flushidx];
				flushidx++;
				set_current_component(component);
				update(component.$$);
			}
		} catch (e) {
			// reset dirty state to not end up in a deadlocked state and then rethrow
			dirty_components.length = 0;
			flushidx = 0;
			throw e;
		}
		set_current_component(null);
		dirty_components.length = 0;
		flushidx = 0;
		while (binding_callbacks.length) binding_callbacks.pop()();
		// then, once components are updated, call
		// afterUpdate functions. This may cause
		// subsequent updates...
		for (let i = 0; i < render_callbacks.length; i += 1) {
			const callback = render_callbacks[i];
			if (!seen_callbacks.has(callback)) {
				// ...so guard against infinite loops
				seen_callbacks.add(callback);
				callback();
			}
		}
		render_callbacks.length = 0;
	} while (dirty_components.length);
	while (flush_callbacks.length) {
		flush_callbacks.pop()();
	}
	update_scheduled = false;
	seen_callbacks.clear();
	set_current_component(saved_component);
}

/** @returns {void} */
function update($$) {
	if ($$.fragment !== null) {
		$$.update();
		run_all($$.before_update);
		const dirty = $$.dirty;
		$$.dirty = [-1];
		$$.fragment && $$.fragment.p($$.ctx, dirty);
		$$.after_update.forEach(add_render_callback);
	}
}

/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */
function flush_render_callbacks(fns) {
	const filtered = [];
	const targets = [];
	render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
	targets.forEach((c) => c());
	render_callbacks = filtered;
}

const outroing = new Set();

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */
function transition_in(block, local) {
	if (block && block.i) {
		outroing.delete(block);
		block.i(local);
	}
}

/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */

/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */

/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */

// general each functions:

function ensure_array_like(array_like_or_iterator) {
	return array_like_or_iterator?.length !== undefined
		? array_like_or_iterator
		: Array.from(array_like_or_iterator);
}

/** @returns {void} */
function mount_component(component, target, anchor) {
	const { fragment, after_update } = component.$$;
	fragment && fragment.m(target, anchor);
	// onMount happens before the initial afterUpdate
	add_render_callback(() => {
		const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
		// if the component was destroyed immediately
		// it will update the `$$.on_destroy` reference to `null`.
		// the destructured on_destroy may still reference to the old array
		if (component.$$.on_destroy) {
			component.$$.on_destroy.push(...new_on_destroy);
		} else {
			// Edge case - component was destroyed immediately,
			// most likely as a result of a binding initialising
			run_all(new_on_destroy);
		}
		component.$$.on_mount = [];
	});
	after_update.forEach(add_render_callback);
}

/** @returns {void} */
function destroy_component(component, detaching) {
	const $$ = component.$$;
	if ($$.fragment !== null) {
		flush_render_callbacks($$.after_update);
		run_all($$.on_destroy);
		$$.fragment && $$.fragment.d(detaching);
		// TODO null out other refs, including component.$$ (but need to
		// preserve final state?)
		$$.on_destroy = $$.fragment = null;
		$$.ctx = [];
	}
}

/** @returns {void} */
function make_dirty(component, i) {
	if (component.$$.dirty[0] === -1) {
		dirty_components.push(component);
		schedule_update();
		component.$$.dirty.fill(0);
	}
	component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
}

// TODO: Document the other params
/**
 * @param {SvelteComponent} component
 * @param {import('./public.js').ComponentConstructorOptions} options
 *
 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
 * This will be the `add_css` function from the compiled component.
 *
 * @returns {void}
 */
function init(
	component,
	options,
	instance,
	create_fragment,
	not_equal,
	props,
	append_styles = null,
	dirty = [-1]
) {
	const parent_component = current_component;
	set_current_component(component);
	/** @type {import('./private.js').T$$} */
	const $$ = (component.$$ = {
		fragment: null,
		ctx: [],
		// state
		props,
		update: noop,
		not_equal,
		bound: blank_object(),
		// lifecycle
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
		// everything else
		callbacks: blank_object(),
		dirty,
		skip_bound: false,
		root: options.target || parent_component.$$.root
	});
	append_styles && append_styles($$.root);
	let ready = false;
	$$.ctx = instance
		? instance(component, options.props || {}, (i, ret, ...rest) => {
				const value = rest.length ? rest[0] : ret;
				if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
					if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
					if (ready) make_dirty(component, i);
				}
				return ret;
		  })
		: [];
	$$.update();
	ready = true;
	run_all($$.before_update);
	// `false` as a special case of no DOM component
	$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	if (options.target) {
		if (options.hydrate) {
			// TODO: what is the correct type here?
			// @ts-expect-error
			const nodes = children(options.target);
			$$.fragment && $$.fragment.l(nodes);
			nodes.forEach(detach);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.c();
		}
		if (options.intro) transition_in(component.$$.fragment);
		mount_component(component, options.target, options.anchor);
		flush();
	}
	set_current_component(parent_component);
}

/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */
class SvelteComponent {
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$ = undefined;
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$set = undefined;

	/** @returns {void} */
	$destroy() {
		destroy_component(this, 1);
		this.$destroy = noop;
	}

	/**
	 * @template {Extract<keyof Events, string>} K
	 * @param {K} type
	 * @param {((e: Events[K]) => void) | null | undefined} callback
	 * @returns {() => void}
	 */
	$on(type, callback) {
		if (!is_function(callback)) {
			return noop;
		}
		const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
		callbacks.push(callback);
		return () => {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		};
	}

	/**
	 * @param {Partial<Props>} props
	 * @returns {void}
	 */
	$set(props) {
		if (this.$$set && !is_empty(props)) {
			this.$$.skip_bound = true;
			this.$$set(props);
			this.$$.skip_bound = false;
		}
	}
}

/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */

// generated during release, do not modify

const PUBLIC_VERSION = '4';

if (typeof window !== 'undefined')
	// @ts-ignore
	(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

const config = {
    // NOME OBRIGATÓRIO: deve começar com "windy-plugin-"
    name: 'windy-plugin-convective-tracker'};

/* src\plugin.svelte generated by Svelte v4.2.20 */

function add_css(target) {
	append_styles(target, "svelte-1ownxr7", ".plugin-logo-container.svelte-1ownxr7.svelte-1ownxr7{text-align:center;margin-bottom:20px;padding:15px;background:linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(108, 117, 125, 0.1));border-radius:8px;border:1px solid rgba(255, 255, 255, 0.1)}.logo-title.svelte-1ownxr7.svelte-1ownxr7{color:#fff;font-size:18px;font-weight:bold;text-shadow:0 0 10px rgba(0, 123, 255, 0.7)}.plugin-footer.svelte-1ownxr7.svelte-1ownxr7{text-align:center;margin-top:20px;padding:15px;color:#aaa;font-size:12px;border-top:1px solid rgba(255, 255, 255, 0.1);background:rgba(0, 0, 0, 0.1);border-radius:0 0 8px 8px}.plugin__content.svelte-1ownxr7.svelte-1ownxr7{display:flex;flex-direction:column;min-height:calc(100vh - 60px)}.tracker-controls.svelte-1ownxr7.svelte-1ownxr7{flex:1}.tracker-controls.svelte-1ownxr7.svelte-1ownxr7{padding:15px}.control-section.svelte-1ownxr7.svelte-1ownxr7{margin-bottom:20px;padding:15px;background:rgba(255, 255, 255, 0.05);border-radius:8px}.control-section.svelte-1ownxr7 h3.svelte-1ownxr7{margin-top:0;color:#fff;font-size:16px;border-bottom:1px solid rgba(255, 255, 255, 0.1);padding-bottom:8px}.button-group.svelte-1ownxr7.svelte-1ownxr7{display:flex;gap:10px;margin-bottom:15px;flex-wrap:wrap}.btn.svelte-1ownxr7.svelte-1ownxr7{padding:8px 16px;border:none;border-radius:4px;cursor:pointer;font-weight:bold;transition:all 0.3s}.btn-primary.svelte-1ownxr7.svelte-1ownxr7{background-color:#007bff;color:white}.btn-primary.svelte-1ownxr7.svelte-1ownxr7:hover:not(:disabled){background-color:#0056b3}.btn-secondary.svelte-1ownxr7.svelte-1ownxr7{background-color:#6c757d;color:white}.btn-secondary.svelte-1ownxr7.svelte-1ownxr7:hover:not(:disabled){background-color:#545b62}.btn-warning.svelte-1ownxr7.svelte-1ownxr7{background-color:#ffc107;color:#212529}.btn-warning.svelte-1ownxr7.svelte-1ownxr7:hover:not(:disabled){background-color:#e0a800}.btn.svelte-1ownxr7.svelte-1ownxr7:disabled{opacity:0.5;cursor:not-allowed}.time-control-section.svelte-1ownxr7.svelte-1ownxr7{margin-top:10px}.manual-time-input.svelte-1ownxr7.svelte-1ownxr7{background:rgba(0, 123, 255, 0.1);padding:15px;border-radius:6px;margin-top:10px}.time-input-row.svelte-1ownxr7.svelte-1ownxr7{display:flex;gap:10px;align-items:flex-end;margin-bottom:10px}.input-group.svelte-1ownxr7.svelte-1ownxr7{flex:1}.input-group.svelte-1ownxr7 label.svelte-1ownxr7{display:block;color:#ddd;margin-bottom:5px;font-size:12px}.input-group.svelte-1ownxr7 input.svelte-1ownxr7{width:100%;padding:8px;border-radius:4px;background:rgba(255, 255, 255, 0.1);border:1px solid rgba(255, 255, 255, 0.2);color:#fff;text-align:center}.time-display-info.svelte-1ownxr7.svelte-1ownxr7{font-size:12px;color:#aaa;text-align:center;margin-top:10px}.info-display.svelte-1ownxr7.svelte-1ownxr7{background:rgba(0, 0, 0, 0.2);padding:15px;border-radius:6px;margin-top:15px}.status-indicator.svelte-1ownxr7.svelte-1ownxr7{padding:2px 8px;border-radius:12px;font-size:12px;font-weight:bold}.status-indicator.active.svelte-1ownxr7.svelte-1ownxr7{background-color:#28a745;color:white}.status-indicator.inactive.svelte-1ownxr7.svelte-1ownxr7{background-color:#dc3545;color:white}.calculation-result.svelte-1ownxr7.svelte-1ownxr7{background:rgba(0, 123, 255, 0.15);padding:12px;border-radius:6px;margin-top:10px;border-left:4px solid #007bff}.unit-note.svelte-1ownxr7.svelte-1ownxr7{font-size:11px;color:#aaa;margin-left:5px}.insignificant.svelte-1ownxr7.svelte-1ownxr7{color:#6c757d;font-style:italic}.significant.svelte-1ownxr7.svelte-1ownxr7{color:#28a745;font-weight:bold}.calculation-method.svelte-1ownxr7.svelte-1ownxr7{font-size:12px;color:#17a2b8;margin-top:5px;padding-top:5px;border-top:1px dashed rgba(255, 255, 255, 0.1)}.projection-controls.svelte-1ownxr7.svelte-1ownxr7{margin-bottom:15px}.time-input.svelte-1ownxr7.svelte-1ownxr7{margin-bottom:15px}.time-input.svelte-1ownxr7 label.svelte-1ownxr7{display:block;color:#fff;font-weight:bold;margin-bottom:8px}.time-slider-container.svelte-1ownxr7.svelte-1ownxr7{position:relative;margin-bottom:5px}.time-slider-container.svelte-1ownxr7 input[type=\"range\"].svelte-1ownxr7{width:100%;height:6px;border-radius:3px;background:rgba(255, 255, 255, 0.1);outline:none}.slider-ticks.svelte-1ownxr7.svelte-1ownxr7{display:flex;justify-content:space-between;margin-top:5px;font-size:11px;color:#aaa}.time-display.svelte-1ownxr7.svelte-1ownxr7{display:flex;justify-content:space-between;align-items:center;margin-top:5px}.projection-options.svelte-1ownxr7.svelte-1ownxr7{margin:15px 0}.checkbox-label.svelte-1ownxr7.svelte-1ownxr7{display:flex;align-items:center;color:#ddd;font-size:14px;margin-bottom:8px;cursor:pointer}.checkbox-label.svelte-1ownxr7 input.svelte-1ownxr7{margin-right:8px}.projection-result.svelte-1ownxr7.svelte-1ownxr7{background:rgba(40, 167, 69, 0.15);padding:12px;border-radius:6px;margin-top:15px;border-left:4px solid #28a745}.projection-result.accelerated.svelte-1ownxr7.svelte-1ownxr7{background:rgba(255, 0, 255, 0.15);border-left:4px solid #ff00ff;animation:svelte-1ownxr7-pulse 2s infinite}.projection-result.uniform.svelte-1ownxr7.svelte-1ownxr7{background:rgba(40, 167, 69, 0.15);border-left:4px solid #28a745}@keyframes svelte-1ownxr7-pulse{0%{box-shadow:0 0 0 0 rgba(255, 0, 255, 0.4)}70%{box-shadow:0 0 0 10px rgba(255, 0, 255, 0)}100%{box-shadow:0 0 0 0 rgba(255, 0, 255, 0)}}.points-list.svelte-1ownxr7.svelte-1ownxr7{max-height:300px;overflow-y:auto;background:rgba(0, 0, 0, 0.2);border-radius:4px;padding:5px}.point-item.svelte-1ownxr7.svelte-1ownxr7{background:rgba(255, 255, 255, 0.05);padding:10px;margin-bottom:8px;border-radius:4px;border-left:3px solid #007bff}.point-header.svelte-1ownxr7.svelte-1ownxr7{display:flex;justify-content:space-between;margin-bottom:5px}.point-number.svelte-1ownxr7.svelte-1ownxr7{font-weight:bold;color:#fff}.point-time.svelte-1ownxr7.svelte-1ownxr7{font-size:11px;color:#aaa;font-family:monospace}.point-coords.svelte-1ownxr7.svelte-1ownxr7{display:flex;justify-content:space-between;font-size:12px;color:#ddd;margin-bottom:5px}.point-time-info.svelte-1ownxr7.svelte-1ownxr7{font-size:11px;color:#888;text-align:center;margin:5px 0}.point-metrics.svelte-1ownxr7.svelte-1ownxr7{display:flex;justify-content:space-between;font-size:11px;color:#17a2b8;padding-top:5px;border-top:1px dashed rgba(255, 255, 255, 0.1)}.no-points.svelte-1ownxr7.svelte-1ownxr7{text-align:center;color:#6c757d;font-style:italic;padding:20px}");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[31] = list[i];
	child_ctx[33] = i;
	return child_ctx;
}

// (77:16) {#if lastCalculation}
function create_if_block_4(ctx) {
	let div;
	let h4;
	let t1;
	let p0;
	let strong0;
	let t3;
	let t4_value = /*lastCalculation*/ ctx[2].currentVelocity.toFixed(1) + "";
	let t4;
	let t5;
	let span;
	let t6;
	let t7_value = (/*lastCalculation*/ ctx[2].currentVelocity * 3.6).toFixed(1) + "";
	let t7;
	let t8;
	let t9;
	let p1;
	let strong1;
	let t11;
	let t12_value = /*lastCalculation*/ ctx[2].currentDirection.toFixed(0) + "";
	let t12;
	let t13;
	let t14;
	let t15;
	let p2;
	let strong2;
	let t17;
	let t18_value = /*lastCalculation*/ ctx[2].totalDistance.toFixed(1) + "";
	let t18;
	let t19;
	let t20;
	let p3;
	let strong3;
	let t22;
	let t23_value = (/*lastCalculation*/ ctx[2].totalTime / 60).toFixed(1) + "";
	let t23;
	let t24;
	let t25;
	let p4;
	let t26;

	let t27_value = (/*lastCalculation*/ ctx[2].useUniformMotion
	? 'Movimento Uniforme'
	: 'Movimento Uniformemente Variado') + "";

	let t27;

	function select_block_type(ctx, dirty) {
		if (/*lastCalculation*/ ctx[2].hasSignificantAcceleration) return create_if_block_5;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			h4 = element("h4");
			h4.textContent = "Resultados dos Cálculos:";
			t1 = space();
			p0 = element("p");
			strong0 = element("strong");
			strong0.textContent = "Velocidade atual:";
			t3 = space();
			t4 = text(t4_value);
			t5 = text(" m/s \r\n                        ");
			span = element("span");
			t6 = text("(");
			t7 = text(t7_value);
			t8 = text(" km/h)");
			t9 = space();
			p1 = element("p");
			strong1 = element("strong");
			strong1.textContent = "Direção atual:";
			t11 = space();
			t12 = text(t12_value);
			t13 = text("°");
			t14 = space();
			if_block.c();
			t15 = space();
			p2 = element("p");
			strong2 = element("strong");
			strong2.textContent = "Distância total:";
			t17 = space();
			t18 = text(t18_value);
			t19 = text(" km");
			t20 = space();
			p3 = element("p");
			strong3 = element("strong");
			strong3.textContent = "Tempo total:";
			t22 = space();
			t23 = text(t23_value);
			t24 = text(" min");
			t25 = space();
			p4 = element("p");
			t26 = text("Método: ");
			t27 = text(t27_value);
			attr(span, "class", "unit-note svelte-1ownxr7");
			attr(p4, "class", "calculation-method svelte-1ownxr7");
			attr(div, "class", "calculation-result svelte-1ownxr7");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h4);
			append(div, t1);
			append(div, p0);
			append(p0, strong0);
			append(p0, t3);
			append(p0, t4);
			append(p0, t5);
			append(p0, span);
			append(span, t6);
			append(span, t7);
			append(span, t8);
			append(div, t9);
			append(div, p1);
			append(p1, strong1);
			append(p1, t11);
			append(p1, t12);
			append(p1, t13);
			append(div, t14);
			if_block.m(div, null);
			append(div, t15);
			append(div, p2);
			append(p2, strong2);
			append(p2, t17);
			append(p2, t18);
			append(p2, t19);
			append(div, t20);
			append(div, p3);
			append(p3, strong3);
			append(p3, t22);
			append(p3, t23);
			append(p3, t24);
			append(div, t25);
			append(div, p4);
			append(p4, t26);
			append(p4, t27);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*lastCalculation*/ 4 && t4_value !== (t4_value = /*lastCalculation*/ ctx[2].currentVelocity.toFixed(1) + "")) set_data(t4, t4_value);
			if (dirty[0] & /*lastCalculation*/ 4 && t7_value !== (t7_value = (/*lastCalculation*/ ctx[2].currentVelocity * 3.6).toFixed(1) + "")) set_data(t7, t7_value);
			if (dirty[0] & /*lastCalculation*/ 4 && t12_value !== (t12_value = /*lastCalculation*/ ctx[2].currentDirection.toFixed(0) + "")) set_data(t12, t12_value);

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, t15);
				}
			}

			if (dirty[0] & /*lastCalculation*/ 4 && t18_value !== (t18_value = /*lastCalculation*/ ctx[2].totalDistance.toFixed(1) + "")) set_data(t18, t18_value);
			if (dirty[0] & /*lastCalculation*/ 4 && t23_value !== (t23_value = (/*lastCalculation*/ ctx[2].totalTime / 60).toFixed(1) + "")) set_data(t23, t23_value);

			if (dirty[0] & /*lastCalculation*/ 4 && t27_value !== (t27_value = (/*lastCalculation*/ ctx[2].useUniformMotion
			? 'Movimento Uniforme'
			: 'Movimento Uniformemente Variado') + "")) set_data(t27, t27_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			if_block.d();
		}
	};
}

// (88:24) {:else}
function create_else_block_1(ctx) {
	let p0;
	let strong0;
	let t1;
	let t2_value = /*lastCalculation*/ ctx[2].acceleration.toFixed(4) + "";
	let t2;
	let t3;
	let t4;
	let p1;

	return {
		c() {
			p0 = element("p");
			strong0 = element("strong");
			strong0.textContent = "Aceleração:";
			t1 = space();
			t2 = text(t2_value);
			t3 = text(" m/s²");
			t4 = space();
			p1 = element("p");
			p1.innerHTML = `<strong>Status:</strong> <span class="insignificant svelte-1ownxr7">insignificante</span>`;
		},
		m(target, anchor) {
			insert(target, p0, anchor);
			append(p0, strong0);
			append(p0, t1);
			append(p0, t2);
			append(p0, t3);
			insert(target, t4, anchor);
			insert(target, p1, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*lastCalculation*/ 4 && t2_value !== (t2_value = /*lastCalculation*/ ctx[2].acceleration.toFixed(4) + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p0);
				detach(t4);
				detach(p1);
			}
		}
	};
}

// (84:24) {#if lastCalculation.hasSignificantAcceleration}
function create_if_block_5(ctx) {
	let p0;
	let strong0;
	let t1;
	let t2_value = /*lastCalculation*/ ctx[2].acceleration.toFixed(4) + "";
	let t2;
	let t3;
	let span0;
	let t4;
	let t5_value = (/*lastCalculation*/ ctx[2].acceleration * 12960).toFixed(1) + "";
	let t5;
	let t6;
	let t7;
	let p1;

	return {
		c() {
			p0 = element("p");
			strong0 = element("strong");
			strong0.textContent = "Aceleração:";
			t1 = space();
			t2 = text(t2_value);
			t3 = text(" m/s²\r\n                            ");
			span0 = element("span");
			t4 = text("(");
			t5 = text(t5_value);
			t6 = text(" km/h por hora)");
			t7 = space();
			p1 = element("p");
			p1.innerHTML = `<strong>Status:</strong> <span class="significant svelte-1ownxr7">SIGNIFICANTE</span>`;
			attr(span0, "class", "unit-note svelte-1ownxr7");
		},
		m(target, anchor) {
			insert(target, p0, anchor);
			append(p0, strong0);
			append(p0, t1);
			append(p0, t2);
			append(p0, t3);
			append(p0, span0);
			append(span0, t4);
			append(span0, t5);
			append(span0, t6);
			insert(target, t7, anchor);
			insert(target, p1, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*lastCalculation*/ 4 && t2_value !== (t2_value = /*lastCalculation*/ ctx[2].acceleration.toFixed(4) + "")) set_data(t2, t2_value);
			if (dirty[0] & /*lastCalculation*/ 4 && t5_value !== (t5_value = (/*lastCalculation*/ ctx[2].acceleration * 12960).toFixed(1) + "")) set_data(t5, t5_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p0);
				detach(t7);
				detach(p1);
			}
		}
	};
}

// (152:12) {#if projectedPosition}
function create_if_block_1(ctx) {
	let div;
	let h4;
	let t1;
	let p0;
	let strong0;
	let t3;
	let t4_value = /*projectedPosition*/ ctx[4].lat.toFixed(4) + "";
	let t4;
	let t5;
	let t6;
	let p1;
	let strong1;
	let t8;
	let t9_value = /*projectedPosition*/ ctx[4].lon.toFixed(4) + "";
	let t9;
	let t10;
	let t11;
	let p2;
	let strong2;
	let t13;
	let t14_value = /*projectedPosition*/ ctx[4].distance.toFixed(1) + "";
	let t14;
	let t15;
	let t16;
	let p3;
	let strong3;
	let t18;
	let t19;
	let t20;
	let t21;
	let t22;
	let t23;
	let p4;
	let strong4;
	let t25;

	let t26_value = (/*projectedPosition*/ ctx[4].useAcceleration
	? 'Movimento Uniformemente Variado (com aceleração)'
	: 'Movimento Uniforme (sem aceleração)') + "";

	let t26;
	let div_class_value;
	let if_block0 = /*projectedPosition*/ ctx[4].estimatedArrival && create_if_block_3(ctx);
	let if_block1 = /*projectedPosition*/ ctx[4].finalVelocity && create_if_block_2(ctx);

	return {
		c() {
			div = element("div");
			h4 = element("h4");
			h4.textContent = "Posição Projetada:";
			t1 = space();
			p0 = element("p");
			strong0 = element("strong");
			strong0.textContent = "Latitude:";
			t3 = space();
			t4 = text(t4_value);
			t5 = text("°");
			t6 = space();
			p1 = element("p");
			strong1 = element("strong");
			strong1.textContent = "Longitude:";
			t8 = space();
			t9 = text(t9_value);
			t10 = text("°");
			t11 = space();
			p2 = element("p");
			strong2 = element("strong");
			strong2.textContent = "Distância:";
			t13 = space();
			t14 = text(t14_value);
			t15 = text(" km");
			t16 = space();
			p3 = element("p");
			strong3 = element("strong");
			strong3.textContent = "Intervalo:";
			t18 = space();
			t19 = text(/*projectionTime*/ ctx[3]);
			t20 = text(" minutos");
			t21 = space();
			if (if_block0) if_block0.c();
			t22 = space();
			if (if_block1) if_block1.c();
			t23 = space();
			p4 = element("p");
			strong4 = element("strong");
			strong4.textContent = "Método:";
			t25 = space();
			t26 = text(t26_value);

			attr(div, "class", div_class_value = "projection-result " + (/*projectedPosition*/ ctx[4].useAcceleration
			? 'accelerated'
			: 'uniform') + " svelte-1ownxr7");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h4);
			append(div, t1);
			append(div, p0);
			append(p0, strong0);
			append(p0, t3);
			append(p0, t4);
			append(p0, t5);
			append(div, t6);
			append(div, p1);
			append(p1, strong1);
			append(p1, t8);
			append(p1, t9);
			append(p1, t10);
			append(div, t11);
			append(div, p2);
			append(p2, strong2);
			append(p2, t13);
			append(p2, t14);
			append(p2, t15);
			append(div, t16);
			append(div, p3);
			append(p3, strong3);
			append(p3, t18);
			append(p3, t19);
			append(p3, t20);
			append(div, t21);
			if (if_block0) if_block0.m(div, null);
			append(div, t22);
			if (if_block1) if_block1.m(div, null);
			append(div, t23);
			append(div, p4);
			append(p4, strong4);
			append(p4, t25);
			append(p4, t26);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*projectedPosition*/ 16 && t4_value !== (t4_value = /*projectedPosition*/ ctx[4].lat.toFixed(4) + "")) set_data(t4, t4_value);
			if (dirty[0] & /*projectedPosition*/ 16 && t9_value !== (t9_value = /*projectedPosition*/ ctx[4].lon.toFixed(4) + "")) set_data(t9, t9_value);
			if (dirty[0] & /*projectedPosition*/ 16 && t14_value !== (t14_value = /*projectedPosition*/ ctx[4].distance.toFixed(1) + "")) set_data(t14, t14_value);
			if (dirty[0] & /*projectionTime*/ 8) set_data(t19, /*projectionTime*/ ctx[3]);

			if (/*projectedPosition*/ ctx[4].estimatedArrival) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					if_block0.m(div, t22);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*projectedPosition*/ ctx[4].finalVelocity) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					if_block1.m(div, t23);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*projectedPosition*/ 16 && t26_value !== (t26_value = (/*projectedPosition*/ ctx[4].useAcceleration
			? 'Movimento Uniformemente Variado (com aceleração)'
			: 'Movimento Uniforme (sem aceleração)') + "")) set_data(t26, t26_value);

			if (dirty[0] & /*projectedPosition*/ 16 && div_class_value !== (div_class_value = "projection-result " + (/*projectedPosition*/ ctx[4].useAcceleration
			? 'accelerated'
			: 'uniform') + " svelte-1ownxr7")) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

// (160:20) {#if projectedPosition.estimatedArrival}
function create_if_block_3(ctx) {
	let p;
	let strong;
	let t1;
	let t2_value = /*projectedPosition*/ ctx[4].estimatedArrival + "";
	let t2;

	return {
		c() {
			p = element("p");
			strong = element("strong");
			strong.textContent = "Chegada estimada:";
			t1 = space();
			t2 = text(t2_value);
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, strong);
			append(p, t1);
			append(p, t2);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*projectedPosition*/ 16 && t2_value !== (t2_value = /*projectedPosition*/ ctx[4].estimatedArrival + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

// (164:20) {#if projectedPosition.finalVelocity}
function create_if_block_2(ctx) {
	let p;
	let strong;
	let t1;
	let t2_value = /*projectedPosition*/ ctx[4].finalVelocity.toFixed(1) + "";
	let t2;
	let t3;
	let span;
	let t4;
	let t5_value = (/*projectedPosition*/ ctx[4].finalVelocity * 3.6).toFixed(1) + "";
	let t5;
	let t6;

	return {
		c() {
			p = element("p");
			strong = element("strong");
			strong.textContent = "Velocidade final estimada:";
			t1 = space();
			t2 = text(t2_value);
			t3 = text(" m/s \r\n                        ");
			span = element("span");
			t4 = text("(");
			t5 = text(t5_value);
			t6 = text(" km/h)");
			attr(span, "class", "unit-note svelte-1ownxr7");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, strong);
			append(p, t1);
			append(p, t2);
			append(p, t3);
			append(p, span);
			append(span, t4);
			append(span, t5);
			append(span, t6);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*projectedPosition*/ 16 && t2_value !== (t2_value = /*projectedPosition*/ ctx[4].finalVelocity.toFixed(1) + "")) set_data(t2, t2_value);
			if (dirty[0] & /*projectedPosition*/ 16 && t5_value !== (t5_value = (/*projectedPosition*/ ctx[4].finalVelocity * 3.6).toFixed(1) + "")) set_data(t5, t5_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

// (199:16) {:else}
function create_else_block(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Nenhum ponto marcado ainda. Ative o modo de marcação e clique no mapa.\r\n                    ";
			attr(div, "class", "no-points svelte-1ownxr7");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (192:24) {#if i > 0}
function create_if_block(ctx) {
	let div;
	let span0;
	let t0;

	let t1_value = (/*point*/ ctx[31].distanceFromPrev
	? /*point*/ ctx[31].distanceFromPrev.toFixed(1)
	: 'N/A') + "";

	let t1;
	let t2;
	let t3;
	let span1;
	let t4;

	let t5_value = (/*point*/ ctx[31].timeFromPrev
	? (/*point*/ ctx[31].timeFromPrev / 1000 / 60).toFixed(1)
	: 'N/A') + "";

	let t5;
	let t6;

	return {
		c() {
			div = element("div");
			span0 = element("span");
			t0 = text("Distância: ");
			t1 = text(t1_value);
			t2 = text(" km");
			t3 = space();
			span1 = element("span");
			t4 = text("Intervalo: ");
			t5 = text(t5_value);
			t6 = text(" min");
			attr(div, "class", "point-metrics svelte-1ownxr7");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, span0);
			append(span0, t0);
			append(span0, t1);
			append(span0, t2);
			append(div, t3);
			append(div, span1);
			append(span1, t4);
			append(span1, t5);
			append(span1, t6);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*points*/ 1 && t1_value !== (t1_value = (/*point*/ ctx[31].distanceFromPrev
			? /*point*/ ctx[31].distanceFromPrev.toFixed(1)
			: 'N/A') + "")) set_data(t1, t1_value);

			if (dirty[0] & /*points*/ 1 && t5_value !== (t5_value = (/*point*/ ctx[31].timeFromPrev
			? (/*point*/ ctx[31].timeFromPrev / 1000 / 60).toFixed(1)
			: 'N/A') + "")) set_data(t5, t5_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (179:16) {#each points as point, i}
function create_each_block(ctx) {
	let div3;
	let div0;
	let span0;
	let t2;
	let span1;
	let t3_value = formatTime(/*point*/ ctx[31].time) + "";
	let t3;
	let t4;
	let div1;
	let span2;
	let t5;
	let t6_value = /*point*/ ctx[31].lat.toFixed(4) + "";
	let t6;
	let t7;
	let t8;
	let span3;
	let t9;
	let t10_value = /*point*/ ctx[31].lon.toFixed(4) + "";
	let t10;
	let t11;
	let t12;
	let div2;
	let small;
	let t13_value = formatDateTime(/*point*/ ctx[31].time) + "";
	let t13;
	let t14;
	let t15;
	let if_block = /*i*/ ctx[33] > 0 && create_if_block(ctx);

	return {
		c() {
			div3 = element("div");
			div0 = element("div");
			span0 = element("span");
			span0.textContent = `Ponto #${/*i*/ ctx[33] + 1}`;
			t2 = space();
			span1 = element("span");
			t3 = text(t3_value);
			t4 = space();
			div1 = element("div");
			span2 = element("span");
			t5 = text("Lat: ");
			t6 = text(t6_value);
			t7 = text("°");
			t8 = space();
			span3 = element("span");
			t9 = text("Lon: ");
			t10 = text(t10_value);
			t11 = text("°");
			t12 = space();
			div2 = element("div");
			small = element("small");
			t13 = text(t13_value);
			t14 = space();
			if (if_block) if_block.c();
			t15 = space();
			attr(span0, "class", "point-number svelte-1ownxr7");
			attr(span1, "class", "point-time svelte-1ownxr7");
			attr(div0, "class", "point-header svelte-1ownxr7");
			attr(div1, "class", "point-coords svelte-1ownxr7");
			attr(div2, "class", "point-time-info svelte-1ownxr7");
			attr(div3, "class", "point-item svelte-1ownxr7");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);
			append(div0, span0);
			append(div0, t2);
			append(div0, span1);
			append(span1, t3);
			append(div3, t4);
			append(div3, div1);
			append(div1, span2);
			append(span2, t5);
			append(span2, t6);
			append(span2, t7);
			append(div1, t8);
			append(div1, span3);
			append(span3, t9);
			append(span3, t10);
			append(span3, t11);
			append(div3, t12);
			append(div3, div2);
			append(div2, small);
			append(small, t13);
			append(div3, t14);
			if (if_block) if_block.m(div3, null);
			append(div3, t15);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*points*/ 1 && t3_value !== (t3_value = formatTime(/*point*/ ctx[31].time) + "")) set_data(t3, t3_value);
			if (dirty[0] & /*points*/ 1 && t6_value !== (t6_value = /*point*/ ctx[31].lat.toFixed(4) + "")) set_data(t6, t6_value);
			if (dirty[0] & /*points*/ 1 && t10_value !== (t10_value = /*point*/ ctx[31].lon.toFixed(4) + "")) set_data(t10, t10_value);
			if (dirty[0] & /*points*/ 1 && t13_value !== (t13_value = formatDateTime(/*point*/ ctx[31].time) + "")) set_data(t13, t13_value);
			if (/*i*/ ctx[33] > 0) if_block.p(ctx, dirty);
		},
		d(detaching) {
			if (detaching) {
				detach(div3);
			}

			if (if_block) if_block.d();
		}
	};
}

function create_fragment(ctx) {
	let div0;
	let t1;
	let section;
	let div2;
	let t3;
	let div3;
	let t5;
	let div24;
	let div10;
	let h30;
	let t7;
	let div9;
	let div8;
	let div6;
	let div4;
	let label0;
	let t9;
	let input0;
	let t10;
	let div5;
	let label1;
	let t12;
	let input1;
	let t13;
	let button0;
	let t15;
	let div7;
	let small;
	let t18;
	let div13;
	let h31;
	let t20;
	let div11;
	let button1;

	let t21_value = (/*trackingMode*/ ctx[1]
	? 'Parar Marcação'
	: 'Iniciar Marcação') + "";

	let t21;
	let t22;
	let button2;
	let t23;
	let button2_disabled_value;
	let t24;
	let button3;
	let t25;
	let button3_disabled_value;
	let t26;
	let div12;
	let p0;
	let t27;
	let t28_value = /*points*/ ctx[0].length + "";
	let t28;
	let t29;
	let p1;
	let t30;
	let span0;
	let t31_value = (/*trackingMode*/ ctx[1] ? 'ATIVO' : 'INATIVO') + "";
	let t31;
	let span0_class_value;
	let t32;
	let t33;
	let div21;
	let h32;
	let t35;
	let div20;
	let div17;
	let label2;
	let t37;
	let div15;
	let input2;
	let t38;
	let div14;
	let t44;
	let div16;
	let span6;
	let t45;
	let t46;
	let t47;
	let span7;
	let t48;
	let t49_value = (/*projectionTime*/ ctx[3] / 60).toFixed(1) + "";
	let t49;
	let t50;
	let t51;
	let div18;
	let label3;
	let input3;
	let t52;
	let span8;
	let t54;
	let label4;
	let input4;
	let t55;
	let span9;
	let t57;
	let div19;
	let button4;
	let t58;
	let button4_disabled_value;
	let t59;
	let button5;
	let t61;
	let t62;
	let div23;
	let h33;
	let t64;
	let div22;
	let t65;
	let div25;
	let mounted;
	let dispose;
	let if_block0 = /*lastCalculation*/ ctx[2] && create_if_block_4(ctx);
	let if_block1 = /*projectedPosition*/ ctx[4] && create_if_block_1(ctx);
	let each_value = ensure_array_like(/*points*/ ctx[0]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let each_1_else = null;

	if (!each_value.length) {
		each_1_else = create_else_block();
	}

	return {
		c() {
			div0 = element("div");
			div0.textContent = "Convective Tracker";
			t1 = space();
			section = element("section");
			div2 = element("div");
			div2.innerHTML = `<div class="logo-title svelte-1ownxr7">Convective Tracker</div>`;
			t3 = space();
			div3 = element("div");
			div3.textContent = "Convective Tracker";
			t5 = space();
			div24 = element("div");
			div10 = element("div");
			h30 = element("h3");
			h30.textContent = "Controle de Tempo";
			t7 = space();
			div9 = element("div");
			div8 = element("div");
			div6 = element("div");
			div4 = element("div");
			label0 = element("label");
			label0.textContent = "Hora:";
			t9 = space();
			input0 = element("input");
			t10 = space();
			div5 = element("div");
			label1 = element("label");
			label1.textContent = "Minutos:";
			t12 = space();
			input1 = element("input");
			t13 = space();
			button0 = element("button");
			button0.textContent = "Agora";
			t15 = space();
			div7 = element("div");
			small = element("small");
			small.textContent = `Próximo ponto: ${/*getNextPointTimeDisplay*/ ctx[10]()}`;
			t18 = space();
			div13 = element("div");
			h31 = element("h3");
			h31.textContent = "Marcador de Pontos";
			t20 = space();
			div11 = element("div");
			button1 = element("button");
			t21 = text(t21_value);
			t22 = space();
			button2 = element("button");
			t23 = text("Reiniciar Tracking");
			t24 = space();
			button3 = element("button");
			t25 = text("Limpar Tudo");
			t26 = space();
			div12 = element("div");
			p0 = element("p");
			t27 = text("Pontos marcados: ");
			t28 = text(t28_value);
			t29 = space();
			p1 = element("p");
			t30 = text("Modo: ");
			span0 = element("span");
			t31 = text(t31_value);
			t32 = space();
			if (if_block0) if_block0.c();
			t33 = space();
			div21 = element("div");
			h32 = element("h3");
			h32.textContent = "Projeção de Trajetória";
			t35 = space();
			div20 = element("div");
			div17 = element("div");
			label2 = element("label");
			label2.textContent = "Tempo de projeção (minutos):";
			t37 = space();
			div15 = element("div");
			input2 = element("input");
			t38 = space();
			div14 = element("div");
			div14.innerHTML = `<span>1</span><span>30</span><span>60</span><span>90</span><span>120</span>`;
			t44 = space();
			div16 = element("div");
			span6 = element("span");
			t45 = text(/*projectionTime*/ ctx[3]);
			t46 = text(" minutos");
			t47 = space();
			span7 = element("span");
			t48 = text("(");
			t49 = text(t49_value);
			t50 = text(" horas)");
			t51 = space();
			div18 = element("div");
			label3 = element("label");
			input3 = element("input");
			t52 = space();
			span8 = element("span");
			span8.textContent = "Usar movimento uniforme (ignorar aceleração)";
			t54 = space();
			label4 = element("label");
			input4 = element("input");
			t55 = space();
			span9 = element("span");
			span9.textContent = "Manter linhas de projeção";
			t57 = space();
			div19 = element("div");
			button4 = element("button");
			t58 = text("Projetar Trajetória");
			t59 = space();
			button5 = element("button");
			button5.textContent = "Limpar Projeção";
			t61 = space();
			if (if_block1) if_block1.c();
			t62 = space();
			div23 = element("div");
			h33 = element("h3");
			h33.textContent = "Histórico de Pontos";
			t64 = space();
			div22 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (each_1_else) {
				each_1_else.c();
			}

			t65 = space();
			div25 = element("div");
			div25.textContent = "Desenvolvido por Andrew Lemos";
			attr(div0, "class", "plugin__mobile-header");
			attr(div2, "class", "plugin-logo-container svelte-1ownxr7");
			attr(div3, "class", "plugin__title plugin__title--chevron-back");
			set_style(div3, "display", "none");
			attr(h30, "class", "svelte-1ownxr7");
			attr(label0, "for", "manualHours");
			attr(label0, "class", "svelte-1ownxr7");
			attr(input0, "type", "number");
			attr(input0, "id", "manualHours");
			attr(input0, "min", "0");
			attr(input0, "max", "23");
			attr(input0, "placeholder", "HH");
			attr(input0, "class", "svelte-1ownxr7");
			attr(div4, "class", "input-group svelte-1ownxr7");
			attr(label1, "for", "manualMinutes");
			attr(label1, "class", "svelte-1ownxr7");
			attr(input1, "type", "number");
			attr(input1, "id", "manualMinutes");
			attr(input1, "min", "0");
			attr(input1, "max", "59");
			attr(input1, "placeholder", "MM");
			attr(input1, "class", "svelte-1ownxr7");
			attr(div5, "class", "input-group svelte-1ownxr7");
			attr(button0, "class", "btn btn-secondary svelte-1ownxr7");
			attr(div6, "class", "time-input-row svelte-1ownxr7");
			attr(div7, "class", "time-display-info svelte-1ownxr7");
			attr(div8, "class", "manual-time-input svelte-1ownxr7");
			attr(div9, "class", "time-control-section svelte-1ownxr7");
			attr(div10, "class", "control-section svelte-1ownxr7");
			attr(h31, "class", "svelte-1ownxr7");
			attr(button1, "class", "btn btn-primary svelte-1ownxr7");
			attr(button2, "class", "btn btn-warning svelte-1ownxr7");
			button2.disabled = button2_disabled_value = /*points*/ ctx[0].length === 0;
			attr(button3, "class", "btn btn-secondary svelte-1ownxr7");
			button3.disabled = button3_disabled_value = /*points*/ ctx[0].length === 0;
			attr(div11, "class", "button-group svelte-1ownxr7");
			attr(span0, "class", span0_class_value = "status-indicator " + (/*trackingMode*/ ctx[1] ? 'active' : 'inactive') + " svelte-1ownxr7");
			attr(div12, "class", "info-display svelte-1ownxr7");
			attr(div13, "class", "control-section svelte-1ownxr7");
			attr(h32, "class", "svelte-1ownxr7");
			attr(label2, "for", "projectionTime");
			attr(label2, "class", "svelte-1ownxr7");
			attr(input2, "type", "range");
			attr(input2, "id", "projectionTime");
			attr(input2, "min", "1");
			attr(input2, "max", "120");
			attr(input2, "step", "1");
			attr(input2, "class", "svelte-1ownxr7");
			attr(div14, "class", "slider-ticks svelte-1ownxr7");
			attr(div15, "class", "time-slider-container svelte-1ownxr7");
			attr(span7, "class", "unit-note svelte-1ownxr7");
			attr(div16, "class", "time-display svelte-1ownxr7");
			attr(div17, "class", "time-input svelte-1ownxr7");
			attr(input3, "type", "checkbox");
			attr(input3, "class", "svelte-1ownxr7");
			attr(label3, "class", "checkbox-label svelte-1ownxr7");
			attr(input4, "type", "checkbox");
			attr(input4, "class", "svelte-1ownxr7");
			attr(label4, "class", "checkbox-label svelte-1ownxr7");
			attr(div18, "class", "projection-options svelte-1ownxr7");
			attr(button4, "class", "btn btn-primary svelte-1ownxr7");
			button4.disabled = button4_disabled_value = !/*lastCalculation*/ ctx[2] || /*points*/ ctx[0].length < 2;
			attr(button5, "class", "btn btn-secondary svelte-1ownxr7");
			attr(div19, "class", "button-group svelte-1ownxr7");
			attr(div20, "class", "projection-controls svelte-1ownxr7");
			attr(div21, "class", "control-section svelte-1ownxr7");
			attr(h33, "class", "svelte-1ownxr7");
			attr(div22, "class", "points-list svelte-1ownxr7");
			attr(div23, "class", "control-section svelte-1ownxr7");
			attr(div24, "class", "tracker-controls svelte-1ownxr7");
			attr(div25, "class", "plugin-footer svelte-1ownxr7");
			attr(section, "class", "plugin__content svelte-1ownxr7");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			insert(target, t1, anchor);
			insert(target, section, anchor);
			append(section, div2);
			append(section, t3);
			append(section, div3);
			append(section, t5);
			append(section, div24);
			append(div24, div10);
			append(div10, h30);
			append(div10, t7);
			append(div10, div9);
			append(div9, div8);
			append(div8, div6);
			append(div6, div4);
			append(div4, label0);
			append(div4, t9);
			append(div4, input0);
			set_input_value(input0, /*manualHours*/ ctx[7]);
			append(div6, t10);
			append(div6, div5);
			append(div5, label1);
			append(div5, t12);
			append(div5, input1);
			set_input_value(input1, /*manualMinutes*/ ctx[8]);
			append(div6, t13);
			append(div6, button0);
			append(div8, t15);
			append(div8, div7);
			append(div7, small);
			append(div24, t18);
			append(div24, div13);
			append(div13, h31);
			append(div13, t20);
			append(div13, div11);
			append(div11, button1);
			append(button1, t21);
			append(div11, t22);
			append(div11, button2);
			append(button2, t23);
			append(div11, t24);
			append(div11, button3);
			append(button3, t25);
			append(div13, t26);
			append(div13, div12);
			append(div12, p0);
			append(p0, t27);
			append(p0, t28);
			append(div12, t29);
			append(div12, p1);
			append(p1, t30);
			append(p1, span0);
			append(span0, t31);
			append(div12, t32);
			if (if_block0) if_block0.m(div12, null);
			append(div24, t33);
			append(div24, div21);
			append(div21, h32);
			append(div21, t35);
			append(div21, div20);
			append(div20, div17);
			append(div17, label2);
			append(div17, t37);
			append(div17, div15);
			append(div15, input2);
			set_input_value(input2, /*projectionTime*/ ctx[3]);
			append(div15, t38);
			append(div15, div14);
			append(div17, t44);
			append(div17, div16);
			append(div16, span6);
			append(span6, t45);
			append(span6, t46);
			append(div16, t47);
			append(div16, span7);
			append(span7, t48);
			append(span7, t49);
			append(span7, t50);
			append(div20, t51);
			append(div20, div18);
			append(div18, label3);
			append(label3, input3);
			input3.checked = /*useUniformMotion*/ ctx[5];
			append(label3, t52);
			append(label3, span8);
			append(div18, t54);
			append(div18, label4);
			append(label4, input4);
			input4.checked = /*keepProjectionLines*/ ctx[6];
			append(label4, t55);
			append(label4, span9);
			append(div20, t57);
			append(div20, div19);
			append(div19, button4);
			append(button4, t58);
			append(div19, t59);
			append(div19, button5);
			append(div21, t61);
			if (if_block1) if_block1.m(div21, null);
			append(div24, t62);
			append(div24, div23);
			append(div23, h33);
			append(div23, t64);
			append(div23, div22);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div22, null);
				}
			}

			if (each_1_else) {
				each_1_else.m(div22, null);
			}

			append(section, t65);
			append(section, div25);

			if (!mounted) {
				dispose = [
					listen(input0, "input", /*input0_input_handler*/ ctx[16]),
					listen(input1, "input", /*input1_input_handler*/ ctx[17]),
					listen(button0, "click", /*setCurrentTime*/ ctx[9]),
					listen(button1, "click", /*toggleTrackingMode*/ ctx[11]),
					listen(button2, "click", /*resetTracking*/ ctx[12]),
					listen(button3, "click", /*clearAll*/ ctx[15]),
					listen(input2, "change", /*input2_change_input_handler*/ ctx[18]),
					listen(input2, "input", /*input2_change_input_handler*/ ctx[18]),
					listen(input3, "change", /*input3_change_handler*/ ctx[19]),
					listen(input4, "change", /*input4_change_handler*/ ctx[20]),
					listen(button4, "click", /*projectTrajectory*/ ctx[13]),
					listen(button5, "click", /*clearProjection*/ ctx[14])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*manualHours*/ 128 && to_number(input0.value) !== /*manualHours*/ ctx[7]) {
				set_input_value(input0, /*manualHours*/ ctx[7]);
			}

			if (dirty[0] & /*manualMinutes*/ 256 && to_number(input1.value) !== /*manualMinutes*/ ctx[8]) {
				set_input_value(input1, /*manualMinutes*/ ctx[8]);
			}

			if (dirty[0] & /*trackingMode*/ 2 && t21_value !== (t21_value = (/*trackingMode*/ ctx[1]
			? 'Parar Marcação'
			: 'Iniciar Marcação') + "")) set_data(t21, t21_value);

			if (dirty[0] & /*points*/ 1 && button2_disabled_value !== (button2_disabled_value = /*points*/ ctx[0].length === 0)) {
				button2.disabled = button2_disabled_value;
			}

			if (dirty[0] & /*points*/ 1 && button3_disabled_value !== (button3_disabled_value = /*points*/ ctx[0].length === 0)) {
				button3.disabled = button3_disabled_value;
			}

			if (dirty[0] & /*points*/ 1 && t28_value !== (t28_value = /*points*/ ctx[0].length + "")) set_data(t28, t28_value);
			if (dirty[0] & /*trackingMode*/ 2 && t31_value !== (t31_value = (/*trackingMode*/ ctx[1] ? 'ATIVO' : 'INATIVO') + "")) set_data(t31, t31_value);

			if (dirty[0] & /*trackingMode*/ 2 && span0_class_value !== (span0_class_value = "status-indicator " + (/*trackingMode*/ ctx[1] ? 'active' : 'inactive') + " svelte-1ownxr7")) {
				attr(span0, "class", span0_class_value);
			}

			if (/*lastCalculation*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					if_block0.m(div12, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*projectionTime*/ 8) {
				set_input_value(input2, /*projectionTime*/ ctx[3]);
			}

			if (dirty[0] & /*projectionTime*/ 8) set_data(t45, /*projectionTime*/ ctx[3]);
			if (dirty[0] & /*projectionTime*/ 8 && t49_value !== (t49_value = (/*projectionTime*/ ctx[3] / 60).toFixed(1) + "")) set_data(t49, t49_value);

			if (dirty[0] & /*useUniformMotion*/ 32) {
				input3.checked = /*useUniformMotion*/ ctx[5];
			}

			if (dirty[0] & /*keepProjectionLines*/ 64) {
				input4.checked = /*keepProjectionLines*/ ctx[6];
			}

			if (dirty[0] & /*lastCalculation, points*/ 5 && button4_disabled_value !== (button4_disabled_value = !/*lastCalculation*/ ctx[2] || /*points*/ ctx[0].length < 2)) {
				button4.disabled = button4_disabled_value;
			}

			if (/*projectedPosition*/ ctx[4]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					if_block1.m(div21, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*points*/ 1) {
				each_value = ensure_array_like(/*points*/ ctx[0]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div22, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;

				if (!each_value.length && each_1_else) {
					each_1_else.p(ctx, dirty);
				} else if (!each_value.length) {
					each_1_else = create_else_block();
					each_1_else.c();
					each_1_else.m(div22, null);
				} else if (each_1_else) {
					each_1_else.d(1);
					each_1_else = null;
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div0);
				detach(t1);
				detach(section);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			destroy_each(each_blocks, detaching);
			if (each_1_else) each_1_else.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

const EARTH_RADIUS_KM = 6371;
const EARTH_RADIUS_M = 6371000;
const SIGNIFICANT_ACCELERATION = 0.001;

function formatTime(timestamp) {
	try {
		const date = new Date(timestamp);
		if (isNaN(date.getTime())) return '--:--:--';

		return date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	} catch(error) {
		return '--:--:--';
	}
}

function formatDateTime(timestamp) {
	try {
		const date = new Date(timestamp);
		if (isNaN(date.getTime())) return 'Data/hora inválida';

		return date.toLocaleString([], {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	} catch(error) {
		return 'Data/hora inválida';
	}
}

function calculateDistanceMeters(point1, point2) {
	const φ1 = point1.lat * Math.PI / 180;
	const φ2 = point2.lat * Math.PI / 180;
	const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
	const Δλ = (point2.lon - point1.lon) * Math.PI / 180;
	const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return EARTH_RADIUS_M * c;
}

function calculateDistanceKm(point1, point2) {
	return calculateDistanceMeters(point1, point2) / 1000;
}

function calculateVelocity(point1, point2) {
	const distanceM = calculateDistanceMeters(point1, point2);
	const timeDiffS = (point2.time - point1.time) / 1000;
	if (timeDiffS <= 0) return 0;
	return distanceM / timeDiffS;
}

function calculateAcceleration(points) {
	if (points.length < 3) return { acceleration: 0, hasSignificant: false };
	const lastPoints = points.slice(-3);
	const v1 = calculateVelocity(lastPoints[0], lastPoints[1]);
	const v2 = calculateVelocity(lastPoints[1], lastPoints[2]);
	const Δt1 = (lastPoints[1].time - lastPoints[0].time) / 1000;
	const Δt2 = (lastPoints[2].time - lastPoints[1].time) / 1000;
	if (Δt1 <= 0 || Δt2 <= 0) return { acceleration: 0, hasSignificant: false };
	const Δt = Δt2;
	const acceleration = (v2 - v1) / Δt;
	const velocityChangePercent = Math.abs((v2 - v1) / v1) * 100;
	const isSignificantByPercent = velocityChangePercent > 10;
	const isSignificantByAbsolute = Math.abs(acceleration) > SIGNIFICANT_ACCELERATION;
	const hasSignificant = isSignificantByAbsolute || isSignificantByPercent;
	console.log(`📊 ACELERAÇÃO DETALHADA:`);
	console.log(`   v1 = ${v1.toFixed(2)} m/s (${(v1 * 3.6).toFixed(1)} km/h)`);
	console.log(`   v2 = ${v2.toFixed(2)} m/s (${(v2 * 3.6).toFixed(1)} km/h)`);
	console.log(`   Δv = ${(v2 - v1).toFixed(2)} m/s`);
	console.log(`   Δt = ${Δt.toFixed(0)} s`);
	console.log(`   a = (v2 - v1) / Δt = ${(v2 - v1).toFixed(2)} / ${Δt.toFixed(0)}`);
	console.log(`   a = ${acceleration.toFixed(4)} m/s²`);
	console.log(`   Mudança percentual: ${velocityChangePercent.toFixed(1)}%`);
	console.log(`   Limite absoluto: ${SIGNIFICANT_ACCELERATION} m/s²`);
	console.log(`   Significativo por absoluto? ${isSignificantByAbsolute}`);
	console.log(`   Significativo por percentual? ${isSignificantByPercent}`);
	console.log(`   ACELERAÇÃO SIGNIFICATIVA? ${hasSignificant ? 'SIM ✅' : 'NÃO ❌'}`);
	return { acceleration, hasSignificant };
}

function calculateDirection(point1, point2) {
	const φ1 = point1.lat * Math.PI / 180;
	const φ2 = point2.lat * Math.PI / 180;
	const λ1 = point1.lon * Math.PI / 180;
	const λ2 = point2.lon * Math.PI / 180;
	const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
	const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
	const θ = Math.atan2(y, x);
	return (θ * 180 / Math.PI + 360) % 360;
}

function calculateAverageDirection(directions) {
	if (directions.length === 0) return 0;
	let x = 0;
	let y = 0;

	directions.forEach(dir => {
		const rad = dir * Math.PI / 180;
		x += Math.cos(rad);
		y += Math.sin(rad);
	});

	const avgRad = Math.atan2(y, x);
	return (avgRad * 180 / Math.PI + 360) % 360;
}

function estimateNextDirection(currentDirection, previousDirection) {
	const diff = currentDirection - previousDirection;
	let normalizedDiff = diff;
	while (normalizedDiff > 180) normalizedDiff -= 360;
	while (normalizedDiff < -180) normalizedDiff += 360;
	const extrapolationFactor = 1.5;
	let nextDirection = currentDirection + normalizedDiff * extrapolationFactor;
	nextDirection = (nextDirection + 360) % 360;
	console.log(`📐 ESTIMATIVA DE DIREÇÃO:`);
	console.log(`   Anterior: ${previousDirection.toFixed(0)}°`);
	console.log(`   Atual: ${currentDirection.toFixed(0)}°`);
	console.log(`   Diferença: ${normalizedDiff.toFixed(0)}°`);
	console.log(`   Fator de extrapolação: ${extrapolationFactor}`);
	console.log(`   Próximo estimado: ${nextDirection.toFixed(0)}°`);
	return nextDirection;
}

function calculateDestinationPoint(lat, lon, bearing, distanceKm) {
	const R = EARTH_RADIUS_KM;
	const distanceRad = distanceKm / R;
	const bearingRad = bearing * Math.PI / 180;
	const lat1 = lat * Math.PI / 180;
	const lon1 = lon * Math.PI / 180;
	const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distanceRad) + Math.cos(lat1) * Math.sin(distanceRad) * Math.cos(bearingRad));
	const lon2 = lon1 + Math.atan2(Math.sin(bearingRad) * Math.sin(distanceRad) * Math.cos(lat1), Math.cos(distanceRad) - Math.sin(lat1) * Math.sin(lat2));

	return {
		lat: lat2 * 180 / Math.PI,
		lon: (lon2 * 180 / Math.PI + 540) % 360 - 180
	};
}

function instance($$self, $$props, $$invalidate) {
	const { name } = config;
	let points = [];
	let trackingMode = false;
	let leafletMarkers = [];
	let leafletLines = [];
	let projectionLine = null;
	let lastCalculation = null;
	let projectionTime = 60;
	let projectedPosition = null;
	let useUniformMotion = false;
	let keepProjectionLines = true;
	let manualHours = 14;
	let manualMinutes = 0;

	function setCurrentTime() {
		const now = new Date();
		$$invalidate(7, manualHours = now.getHours());
		$$invalidate(8, manualMinutes = now.getMinutes());
	}

	function getManualTimestamp() {
		try {
			let hours = manualHours;
			let minutes = manualMinutes;
			if (isNaN(hours) || hours < 0 || hours > 23) hours = 14;
			if (isNaN(minutes) || minutes < 0 || minutes > 59) minutes = 0;
			const now = new Date();
			const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
			return date.getTime();
		} catch(error) {
			console.error('❌ Erro ao criar timestamp:', error);
			return Date.now();
		}
	}

	function getNextPointTimeDisplay() {
		try {
			const timestamp = getManualTimestamp();
			return formatDateTime(timestamp);
		} catch(error) {
			return 'Horário inválido';
		}
	}

	function toggleTrackingMode() {
		$$invalidate(1, trackingMode = !trackingMode);
		console.log('Modo tracking:', trackingMode ? 'ATIVO' : 'INATIVO');

		if (trackingMode) {
			console.log('✅ Pronto para marcar pontos! Clique no mapa.');
		}
	}

	function resetTracking() {
		$$invalidate(1, trackingMode = false);

		if (points.length >= 2) {
			calculateTrajectory();
		}

		if (projectedPosition) {
			clearProjection();
		}
	}

	function addWindyMarker(lat, lon, pointNumber, timestamp) {
		try {
			const marker = L.marker([lat, lon], {
				icon: markers.pulsatingIcon,
				title: `Ponto ${pointNumber} - ${timestamp}`
			}).addTo(map);

			marker.bindTooltip(`Ponto ${pointNumber}<br>${timestamp}`, { permanent: false, direction: 'top' });

			marker.bindPopup(`
                <div style="text-align: center; padding: 5px;">
                    <strong>Ponto ${pointNumber}</strong><br>
                    ${timestamp}<br>
                    Lat: ${lat.toFixed(4)}°<br>
                    Lon: ${lon.toFixed(4)}°
                </div>
            `);

			leafletMarkers.push(marker);
			console.log(`📍 Marcador ${pointNumber} adicionado`);
			return marker;
		} catch(error) {
			console.error('❌ Erro ao adicionar marcador:', error);
			return null;
		}
	}

	function handleMapClick(lat, lon) {
		if (!trackingMode) {
			console.log('⚠️ Modo tracking inativo. Ative primeiro clicando em "Iniciar Marcação"');
			return;
		}

		try {
			const currentTimestamp = getManualTimestamp();
			const timestampDisplay = formatTime(currentTimestamp);

			const newPoint = {
				lat,
				lon,
				time: currentTimestamp,
				timestamp: timestampDisplay
			};

			if (points.length > 0) {
				const lastPoint = points[points.length - 1];
				newPoint.distanceFromPrev = calculateDistanceKm(lastPoint, newPoint);
				newPoint.timeFromPrev = currentTimestamp - lastPoint.time;

				if (newPoint.timeFromPrev > 0) {
					newPoint.velocity = calculateVelocity(lastPoint, newPoint);
					newPoint.direction = calculateDirection(lastPoint, newPoint);
					console.log(`📊 Δ Tempo: ${(newPoint.timeFromPrev / 1000 / 60).toFixed(1)} min`);
					console.log(`📊 Velocidade: ${newPoint.velocity?.toFixed(1)} m/s (${(newPoint.velocity * 3.6).toFixed(1)} km/h)`);
					console.log(`📊 Direção: ${newPoint.direction?.toFixed(1)}°`);
				}
			}

			$$invalidate(0, points = [...points, newPoint]);

			console.log(`✅ Ponto ${points.length} marcado:`, {
				lat: lat.toFixed(4),
				lon: lon.toFixed(4),
				time: formatDateTime(currentTimestamp)
			});

			addWindyMarker(lat, lon, points.length, timestampDisplay);

			if (points.length >= 2) {
				drawTrajectoryLine();
				calculateTrajectory();
			}
		} catch(error) {
			console.error('❌ Erro ao marcar ponto:', error);
			alert('Erro ao marcar ponto. Verifique os dados.');
		}
	}

	function drawTrajectoryLine() {
		if (points.length < 2) return;

		leafletLines.forEach(line => {
			if (map && line) map.removeLayer(line);
		});

		leafletLines = [];
		const latLngs = points.map(p => [p.lat, p.lon]);

		const line = L.polyline(latLngs, {
			color: '#ff0000',
			weight: 3,
			opacity: 0.7,
			dashArray: null
		}).addTo(map);

		leafletLines.push(line);
	}

	function calculateTrajectory() {
		if (points.length < 2) {
			console.log('Precisa de pelo menos 2 pontos para calcular trajetória');
			return;
		}

		const velocities = [];
		const directions = [];
		let totalDistanceM = 0;
		let totalTimeS = 0;
		let lastSegmentTime = 0;

		for (let i = 0; i < points.length - 1; i++) {
			const velocity = calculateVelocity(points[i], points[i + 1]);
			velocities.push(velocity);
			directions.push(calculateDirection(points[i], points[i + 1]));
			totalDistanceM += calculateDistanceMeters(points[i], points[i + 1]);
			const segmentTime = (points[i + 1].time - points[i].time) / 1000;
			totalTimeS += segmentTime;

			if (i === points.length - 2) {
				lastSegmentTime = segmentTime;
			}
		}

		if (totalTimeS <= 0) {
			console.error('❌ Tempo total inválido para cálculo.');
			$$invalidate(2, lastCalculation = null);
			return;
		}

		const avgVelocity = velocities.reduce((a, b) => a + b, 0) / velocities.length;

		const currentVelocity = velocities.length > 0
		? velocities[velocities.length - 1]
		: avgVelocity;

		const { acceleration, hasSignificant } = calculateAcceleration(points);
		const avgDirection = calculateAverageDirection(directions);

		const currentDirection = directions.length > 0
		? directions[directions.length - 1]
		: avgDirection;

		let directionAngle = currentDirection;

		if (directions.length >= 2) {
			directionAngle = estimateNextDirection(directions[directions.length - 1], directions[directions.length - 2]);
		}

		let shouldUseUniformMotion = false;

		if (useUniformMotion) {
			shouldUseUniformMotion = true;
			console.log('⚙️ Usando MRU (usuário escolheu movimento uniforme)');
		} else if (hasSignificant) {
			shouldUseUniformMotion = false;
			console.log('⚙️ Usando MRUV (aceleração significativa detectada)');
		} else {
			shouldUseUniformMotion = true;
			console.log('⚙️ Usando MRU (aceleração insignificante)');
		}

		let estimatedInstantVelocity = currentVelocity;

		if (hasSignificant && !shouldUseUniformMotion && lastSegmentTime > 0) {
			estimatedInstantVelocity = currentVelocity + acceleration * lastSegmentTime;
			console.log(`📊 VELOCIDADE INSTANTÂNEA COM ACELERAÇÃO:`);
			console.log(`   v0 = ${currentVelocity.toFixed(2)} m/s`);
			console.log(`   a = ${acceleration.toFixed(4)} m/s²`);
			console.log(`   t = ${lastSegmentTime.toFixed(0)} s`);
			console.log(`   v = ${currentVelocity.toFixed(2)} + ${acceleration.toFixed(4)} * ${lastSegmentTime.toFixed(0)}`);
			console.log(`   v = ${estimatedInstantVelocity.toFixed(2)} m/s`);
		}

		$$invalidate(2, lastCalculation = {
			currentVelocity: estimatedInstantVelocity,
			avgVelocity,
			acceleration,
			currentDirection: directionAngle,
			avgDirection,
			hasSignificantAcceleration: hasSignificant,
			useUniformMotion: shouldUseUniformMotion,
			points: [...points],
			totalDistance: totalDistanceM / 1000,
			totalTime: totalTimeS,
			lastSegmentTime,
			directionAngle
		});

		console.log(('=').repeat(60));
		console.log('📊 RESUMO DA TRAJETÓRIA CALCULADA:');
		console.log(('=').repeat(60));
		console.log(`   Velocidade atual: ${estimatedInstantVelocity.toFixed(1)} m/s (${(estimatedInstantVelocity * 3.6).toFixed(1)} km/h)`);
		console.log(`   Velocidade média: ${avgVelocity.toFixed(1)} m/s`);
		console.log(`   Direção atual: ${currentDirection.toFixed(0)}°`);
		console.log(`   Direção estimada: ${directionAngle.toFixed(0)}°`);
		console.log(`   Aceleração: ${acceleration.toFixed(4)} m/s²`);
		console.log(`   Status aceleração: ${hasSignificant ? 'SIGNIFICANTE ✅' : 'insignificante'}`);

		console.log(`   Método selecionado: ${shouldUseUniformMotion
		? 'MRU (Movimento Uniforme)'
		: 'MRUV (Movimento Uniformemente Variado)'}`);

		console.log(`   Distância total: ${(totalDistanceM / 1000).toFixed(1)} km`);
		console.log(`   Tempo total: ${(totalTimeS / 60).toFixed(1)} min`);
		console.log(('=').repeat(60));
	}

	function projectTrajectory() {
		if (!lastCalculation || points.length < 2) {
			console.log('Não há cálculo disponível para projetar');
			return;
		}

		try {
			const lastPoint = points[points.length - 1];
			const timeInSeconds = projectionTime * 60;
			let projectedDistanceM;
			let finalVelocityMps;
			let useAcceleration = false;
			console.log(('=').repeat(60));
			console.log('🚀 INICIANDO PROJEÇÃO DE TRAJETÓRIA');
			console.log(('=').repeat(60));
			console.log(`   Tempo de projeção: ${timeInSeconds} s (${projectionTime} min)`);
			console.log(`   Velocidade atual: ${lastCalculation.currentVelocity.toFixed(2)} m/s (${(lastCalculation.currentVelocity * 3.6).toFixed(1)} km/h)`);
			console.log(`   Aceleração: ${lastCalculation.acceleration.toFixed(4)} m/s²`);
			console.log(`   Direção: ${lastCalculation.currentDirection.toFixed(0)}°`);

			console.log(`   Aceleração significativa? ${lastCalculation.hasSignificantAcceleration
			? 'SIM ✅'
			: 'NÃO ❌'}`);

			console.log(`   Config. usuário (usar MRU): ${useUniformMotion ? 'SIM' : 'NÃO'}`);
			console.log(`   Método calculado: ${lastCalculation.useUniformMotion ? 'MRU' : 'MRUV'}`);
			let forceUseAcceleration = false;

			if (lastCalculation.hasSignificantAcceleration && !useUniformMotion) {
				forceUseAcceleration = true;
				console.log('⚡ FORÇANDO USO DE MRUV (aceleração significativa detectada)');
			}

			if (lastCalculation.useUniformMotion && !forceUseAcceleration) {
				projectedDistanceM = lastCalculation.currentVelocity * timeInSeconds;
				finalVelocityMps = lastCalculation.currentVelocity;
				useAcceleration = false;
				console.log('\n📏 PROJEÇÃO MRU (Movimento Uniforme):');
				console.log(`   Fórmula: s = v * t`);
				console.log(`   v = ${lastCalculation.currentVelocity.toFixed(2)} m/s`);
				console.log(`   t = ${timeInSeconds} s`);
				console.log(`   s = ${lastCalculation.currentVelocity.toFixed(2)} * ${timeInSeconds}`);
				console.log(`   s = ${projectedDistanceM.toFixed(0)} m`);
			} else {
				const v0 = lastCalculation.currentVelocity;
				const a = lastCalculation.acceleration;
				const part1 = v0 * timeInSeconds;
				const part2 = 0.5 * a * timeInSeconds * timeInSeconds;
				projectedDistanceM = part1 + part2;
				finalVelocityMps = v0 + a * timeInSeconds;
				useAcceleration = true;
				console.log('\n📏 PROJEÇÃO MRUV (Movimento Uniformemente Variado):');
				console.log(`   Fórmula: s = v0*t + 0.5*a*t²`);
				console.log(`   v0 = ${v0.toFixed(2)} m/s`);
				console.log(`   a = ${a.toFixed(4)} m/s²`);
				console.log(`   t = ${timeInSeconds} s`);
				console.log(`   v0*t = ${v0.toFixed(2)} * ${timeInSeconds} = ${part1.toFixed(0)} m`);
				console.log(`   0.5*a*t² = 0.5 * ${a.toFixed(4)} * ${timeInSeconds}² = ${part2.toFixed(0)} m`);
				console.log(`   s = ${part1.toFixed(0)} + ${part2.toFixed(0)} = ${projectedDistanceM.toFixed(0)} m`);
				console.log(`\n📏 Velocidade final (v = v0 + a*t):`);
				console.log(`   v = ${v0.toFixed(2)} + ${a.toFixed(4)} * ${timeInSeconds}`);
				console.log(`   v = ${v0.toFixed(2)} + ${(a * timeInSeconds).toFixed(2)}`);
				console.log(`   v = ${finalVelocityMps.toFixed(2)} m/s`);
			}

			const MAX_DISTANCE_M = 10000 * 1000;
			const MAX_VELOCITY_MPS = 500;

			if (projectedDistanceM < 0) {
				console.warn(`⚠️ Distância negativa detectada: ${projectedDistanceM.toFixed(0)} m, ajustando para 0`);
				projectedDistanceM = 0;
				finalVelocityMps = 0;
			}

			if (projectedDistanceM > MAX_DISTANCE_M) {
				console.warn(`⚠️ Distância muito alta: ${projectedDistanceM.toFixed(0)} m, limitando para ${MAX_DISTANCE_M} m`);
				projectedDistanceM = MAX_DISTANCE_M;
			}

			if (finalVelocityMps < 0) finalVelocityMps = 0;

			if (finalVelocityMps > MAX_VELOCITY_MPS) {
				console.warn(`⚠️ Velocidade final muito alta: ${finalVelocityMps.toFixed(1)} m/s, limitando para ${MAX_VELOCITY_MPS} m/s`);
				finalVelocityMps = MAX_VELOCITY_MPS;
			}

			const projectedDistanceKm = projectedDistanceM / 1000;
			console.log(`\n📏 DISTÂNCIA FINAL PROJETADA: ${projectedDistanceKm.toFixed(1)} km`);
			const bearing = lastCalculation.currentDirection;
			const destination = calculateDestinationPoint(lastPoint.lat, lastPoint.lon, bearing, projectedDistanceKm);

			if (destination.lat < -90 || destination.lat > 90 || destination.lon < -180 || destination.lon > 180) {
				console.warn(`⚠️ Coordenadas fora dos limites: Lat=${destination.lat.toFixed(4)}, Lon=${destination.lon.toFixed(4)}`);
				if (destination.lat < -90) destination.lat = -90;
				if (destination.lat > 90) destination.lat = 90;
				if (destination.lon < -180) destination.lon = -180 + 360;
				if (destination.lon > 180) destination.lon = 180 - 360;
			}

			const arrivalTime = new Date(lastPoint.time + projectionTime * 60 * 1000);
			const arrivalTimeStr = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

			$$invalidate(4, projectedPosition = {
				lat: destination.lat,
				lon: destination.lon,
				distance: projectedDistanceKm,
				estimatedArrival: arrivalTimeStr,
				useAcceleration,
				finalVelocity: finalVelocityMps
			});

			clearProjection();

			const destMarker = L.marker([destination.lat, destination.lon], {
				icon: L.divIcon({
					html: useAcceleration
					? '<div style="background: #ff00ff; color: #fff; width: 28px; height: 28px; border-radius: 50%; border: 3px solid #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; box-shadow: 0 0 10px #ff00ff;">🎯</div>'
					: '<div style="background: #00ff00; color: #000; width: 28px; height: 28px; border-radius: 50%; border: 3px solid #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; box-shadow: 0 0 10px #00ff00;">🎯</div>',
					iconSize: [28, 28],
					className: 'destination-marker'
				}),
				title: `Destino em ${projectionTime} minutos`
			}).addTo(map);

			destMarker.bindTooltip(
				`Destino em ${projectionTime} min<br>` + `Distância: ${projectedDistanceKm.toFixed(1)} km<br>` + `Velocidade final: ${finalVelocityMps.toFixed(1)} m/s (${(finalVelocityMps * 3.6).toFixed(1)} km/h)<br>` + `Chegada: ${arrivalTimeStr}<br>` + `Método: ${useAcceleration
				? 'MRUV (com aceleração)'
				: 'MRU (sem aceleração)'}`,
				{ permanent: false, direction: 'top' }
			);

			leafletMarkers.push(destMarker);

			projectionLine = L.polyline([[lastPoint.lat, lastPoint.lon], [destination.lat, destination.lon]], {
				color: useAcceleration ? '#ff00ff' : '#00ff00',
				weight: 3,
				opacity: 0.8,
				dashArray: useAcceleration ? '10, 10' : null,
				lineCap: 'round'
			}).addTo(map);

			console.log('\n🎯 RESULTADO DA PROJEÇÃO:');
			console.log(('=').repeat(60));
			console.log(`   Posição: ${destination.lat.toFixed(4)}°, ${destination.lon.toFixed(4)}°`);
			console.log(`   Distância: ${projectedDistanceKm.toFixed(1)} km`);
			console.log(`   Velocidade final: ${finalVelocityMps.toFixed(1)} m/s (${(finalVelocityMps * 3.6).toFixed(1)} km/h)`);
			console.log(`   Chegada: ${arrivalTimeStr}`);

			console.log(`   Método: ${useAcceleration
			? 'MRUV (Movimento Uniformemente Variado)'
			: 'MRU (Movimento Uniforme)'}`);

			console.log(('=').repeat(60));
		} catch(error) {
			console.error('❌ ERRO AO PROJETAR TRAJETÓRIA:', error);
			alert('Erro ao projetar trajetória: ' + error.message);
		}
	}

	function clearProjection() {
		if (projectionLine && map && map.hasLayer(projectionLine)) {
			map.removeLayer(projectionLine);
			projectionLine = null;
		}

		const mapObj = getMap();

		if (mapObj) {
			const markersToRemove = [];

			leafletMarkers.forEach((marker, index) => {
				if (marker.options.icon?.options?.className === 'destination-marker') {
					if (mapObj.hasLayer(marker)) {
						mapObj.removeLayer(marker);
						markersToRemove.push(index);
					}
				}
			});

			markersToRemove.reverse().forEach(index => {
				leafletMarkers.splice(index, 1);
			});
		}

		$$invalidate(4, projectedPosition = null);
		console.log('🧹 Projeção limpa');
	}

	function clearAll() {
		console.log('🧹 INICIANDO LIMPEZA TOTAL...');
		clearProjection();
		$$invalidate(0, points = []);
		$$invalidate(2, lastCalculation = null);
		$$invalidate(4, projectedPosition = null);
		const mapObj = getMap();

		if (mapObj) {
			leafletMarkers.forEach(marker => {
				if (mapObj.hasLayer(marker)) {
					mapObj.removeLayer(marker);
				}
			});

			leafletLines.forEach(line => {
				if (mapObj.hasLayer(line)) {
					mapObj.removeLayer(line);
				}
			});
		}

		leafletMarkers = [];
		leafletLines = [];
		$$invalidate(1, trackingMode = false);
		console.log('✅ TODOS OS DADOS FORAM LIMPOS COMPLETAMENTE');
	}

	function getMap() {
		return map;
	}

	onMount(() => {
		console.log('🚀 Plugin Convective Tracker iniciando...');
		console.log('🔧 Nome do plugin:', name);
		console.log('⚙️ CONFIGURAÇÃO DO SISTEMA:');
		console.log('   - Sensibilidade da aceleração:', SIGNIFICANT_ACCELERATION, 'm/s²');
		console.log('   - Detecta aceleração por valor absoluto OU mudança percentual > 10%');
		console.log('   - MRU padrão: DESATIVADO (teste MRUV primeiro)');
		console.log('   - Botão "Limpar Projeção": SEMPRE ATIVO');
		setCurrentTime();

		if (singleclick && typeof singleclick.on === 'function') {
			try {
				console.log('🎯 Configurando singleclick listener...');

				singleclick.on(name, latLon => {
					console.log('🗺️ Clique recebido:', latLon);
					handleMapClick(latLon.lat, latLon.lon);
				});

				console.log('✅ Listener configurado!');
			} catch(error) {
				console.error('❌ Erro ao configurar singleclick:', error);
			}
		}

		console.log('\n📝 INSTRUÇÕES PARA TESTE:');
		console.log('   1. Desmarque "Usar movimento uniforme" para testar MRUV');
		console.log('   2. Marque 3+ pontos com intervalos regulares');
		console.log('   3. Veja no console se aceleração é detectada como SIGNIFICANTE');
		console.log('   4. Projete trajetória e compare MRU vs MRUV');
		console.log('   5. Use "Limpar Projeção" a qualquer momento');
		console.log('   6. Use "Limpar Tudo" para reiniciar completamente');
		console.log('\n🎯 Plugin Convective Tracker carregado e pronto!');
	});

	onDestroy(() => {
		console.log('🔚 Plugin sendo destruído...');

		if (singleclick && typeof singleclick.off === 'function') {
			try {
				singleclick.off(name);
				console.log('✅ Listener singleclick removido');
			} catch(error) {
				console.error('❌ Erro ao remover listener:', error);
			}
		}

		clearAll();
	});

	function input0_input_handler() {
		manualHours = to_number(this.value);
		$$invalidate(7, manualHours);
	}

	function input1_input_handler() {
		manualMinutes = to_number(this.value);
		$$invalidate(8, manualMinutes);
	}

	function input2_change_input_handler() {
		projectionTime = to_number(this.value);
		$$invalidate(3, projectionTime);
	}

	function input3_change_handler() {
		useUniformMotion = this.checked;
		$$invalidate(5, useUniformMotion);
	}

	function input4_change_handler() {
		keepProjectionLines = this.checked;
		$$invalidate(6, keepProjectionLines);
	}

	return [
		points,
		trackingMode,
		lastCalculation,
		projectionTime,
		projectedPosition,
		useUniformMotion,
		keepProjectionLines,
		manualHours,
		manualMinutes,
		setCurrentTime,
		getNextPointTimeDisplay,
		toggleTrackingMode,
		resetTracking,
		projectTrajectory,
		clearProjection,
		clearAll,
		input0_input_handler,
		input1_input_handler,
		input2_change_input_handler,
		input3_change_handler,
		input4_change_handler
	];
}

class Plugin extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {}, add_css, [-1, -1]);
	}
}


// transformCode: Export statement was modified
export { __pluginConfig, Plugin as default };
//# sourceMappingURL=plugin.js.map
