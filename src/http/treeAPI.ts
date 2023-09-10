import axios from 'axios';

export const getTreeNode = async () => {
    const data = axios.post(`${process.env.REACT_APP_API_URL}.get?treeName=${process.env.REACT_APP_TREE_NAME}`);
    return data;
}

export const createTreeNode = async (parentNodeId: string, nodeName: string) => {
    const data = axios.post(`${process.env.REACT_APP_API_URL}.node.create?treeName=${process.env.REACT_APP_TREE_NAME}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`)
    return data
}

export const deleteTreeNode = async (nodeId: string) => {
    const data = axios.post(
    `${process.env.REACT_APP_API_URL}.node.delete?treeName=${process.env.REACT_APP_TREE_NAME}&nodeId=${nodeId}`);
    return data
}

export const renameTreeNode = async (nodeId: string, newNodeName: string) => {
    const data = axios.post(`${process.env.REACT_APP_API_URL}.node.rename?treeName=${process.env.REACT_APP_TREE_NAME}&nodeId=${nodeId}&newNodeName=${newNodeName}`)
    return data
}
