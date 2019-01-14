// import React, { Component } from 'react'
const contextList = (parameter) => {
    const realParam = encodeURIComponent(JSON.stringify(parameter))
    let subPageList = []
    if (parameter.listType === 'netmouth') {
        //网口二级视图菜单
        subPageList = [
            { name: '主机视图', url: '/subpage/hostview/' + realParam, key: '/subpage/hostview' },
            { name: '端口视图', url: '/subpage/portview/' + realParam, key: '/subpage/portview' },
            { name: '主机组视图', url: '/subpage/hostgroupview/' + realParam, key: '/subpage/hostgroupview' },
            { name: '主机端对端', url: '/subpage/ptpview/' + realParam, key: 'subpage/ptpview' }
        ]
    } else if (parameter.listType === 'host') {
        subPageList = [
            { name: '端口视图', url: '/subpage/portview/' + realParam, key: '/subpage/portview' },
            { name: '主机端对端', url: '/subpage/ptpview/' + realParam, key: 'subpage/ptpview' },
            { name: '网口视图', url: '/subpage/netmouthview/' + realParam, key: 'subpage/netmouthview' }
        ]
    } else if (parameter.listType === 'hostgroup') {
        subPageList = [
            { name: '主机视图', url: '/subpage/hostview/' + realParam, key: '/subpage/hostview' },
            { name: '端口视图', url: '/subpage/portview/' + realParam, key: '/subpage/portview' },
            { name: '主机组端对端视图', url: '/subpage/ptgview/' + realParam, key: '/subpage/ptgview' },
            { name: '网口视图', url: '/subpage/netmouthview/' + realParam, key: 'subpage/netmouthview' }
        ]
    } else if (parameter.listType === 'application') {
        subPageList = [
            { name: '应用分析视图', url: '/subpage/appanalysisview/' + realParam, key: '/subpage/appanalysisview' },
            { name: '会话分析视图', url: '/subpage/conversationview/' + realParam, key: '/subpage/conversationview' },
            { name: '网口视图', url: '/subpage/netmouthview/' + realParam, key: 'subpage/netmouthview' },
            { name: '时间响应视图', url: '/subpage/timeresponseview/' + realParam, key: 'subpage/timeresponseview' }
        ]
    }
    return subPageList
}

export default contextList
