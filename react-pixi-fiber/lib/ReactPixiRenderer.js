import Reconciler from "react-reconciler";

export const ReactPixiRenderer = Reconciler({
    appendInitialChild(parentInstance, child) {
        if (parentInstance.appendChild) {
            parentInstance.appendChild(child);
        } else {
            parentInstance.document = child;
        }
    },

    createInstance(type, props, internalInstanceHandle) {
        return createElement(type, props, internalInstanceHandle);
    },

    createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
        return text;
    },

    finalizeInitialChildren(wordElement, type, props) {
        return false;
    },

    getPublicInstance(inst) {
        return inst;
    },

    prepareForCommit() {
        // noop
    },

    prepareUpdate(wordElement, type, oldProps, newProps) {
        return true;
    },

    resetAfterCommit() {
        // noop
    },

    resetTextContent(wordElement) {
        // noop
    },

    getRootHostContext(rootInstance) {
        // You can use this 'rootInstance' to pass data from the roots.
    },

    getChildHostContext() {
        return emptyObject;
    },

    shouldSetTextContent(type, props) {
        return false;
    },

    now: () => {},

    supportsMutation: false
});