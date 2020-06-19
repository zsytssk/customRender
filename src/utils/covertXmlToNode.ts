import { Laya } from 'Laya';

export function convertXMLToNode(xmlText) {
    let node;
    const jsonObj = xml_str2json(xmlText);
    node = convertJSONToNode(jsonObj);
    return node;
}
export function convertJSONToNode(jsonObj) {
    const type = jsonObj.type;
    let node;
    if (!Laya[type]) {
        return;
    }
    node = new Laya[type]();
    const props = jsonObj.props;
    for (const prop_name in props) {
        if (!props.hasOwnProperty(prop_name)) {
            continue;
        }
        // 属性
        let prop_val = props[prop_name];

        if (!isNaN(Number(prop_val))) {
            prop_val = Number(prop_val);
        }
        node[prop_name] = prop_val;
    }
    const children = jsonObj.children;
    for (const item of children) {
        const child_json = item;
        const child_node = convertJSONToNode(child_json);
        if (child_node) {
            node.addChild(child_node);
        }
    }
    return node;
}
export function xml2json(node) {
    const result = {} as {
        type: any;
        children: any;
        props: any;
    };
    result.type = getNodeLocalName(node);
    result.children = [];
    const nodeChildren = node.childNodes;
    for (let cidx = 0; cidx < nodeChildren.length; cidx++) {
        const child = nodeChildren.item(cidx);
        const json_child = xml2json(child);
        result.children.push(json_child);
    }

    // Attributes
    if (node.attributes) {
        result.props = {};
        for (let index = 0; index < node.attributes.length; index++) {
            const attr = node.attributes.item(index);
            result.props[attr.name] = attr.value;
        }
    }
    return result;
}
export function getNodeLocalName(node) {
    let nodeLocalName = node.localName;
    if (nodeLocalName === null) {
        // Yeah, this is IE!!
        nodeLocalName = node.baseName;
    }
    if (nodeLocalName === null || nodeLocalName === '') {
        // =="" is IE too
        nodeLocalName = node.nodeName;
    }
    return nodeLocalName;
}
export function xml_str2json(xmlDocStr) {
    const xmlDoc = parseXmlString(xmlDocStr);
    if (xmlDoc !== null) {
        return xml2json(xmlDoc);
    } else {
        return null;
    }
}
export function parseXmlString(xmlDocStr) {
    if (xmlDocStr === undefined) {
        return null;
    }
    // tslint:disable-next-line:one-variable-per-declaration
    let xmlDoc, parser;
    if ((window as any).DOMParser) {
        parser = new (window as any).DOMParser();
    }
    try {
        xmlDoc = parser.parseFromString(xmlDocStr, 'text/xml').firstChild;
    } catch (err) {
        xmlDoc = null;
    }
    return xmlDoc;
}
