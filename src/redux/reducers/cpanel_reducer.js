const initialState = {
    loadingD: true,
    loading: true,
    details: null,
    domain: null,
    cpanel_link: '',
    cpanel_link_lodain: true,

    tools_domains: '',
    tools_wordpress: '',
    tools_analytics: '',
    tools_backup: '',
    tools_filemanager: '',
    tools_cron: '',
    tools_email: '',
    tools_links_lodaing: true,

}

export default cpanel = (state = initialState, action) => {
    switch (action.type) {
        case 'CPANEL_DETAILS':
            return {
                ...state,
                details: action.payload.details,
                loadingD: false,
            };
        case 'CPANEL_DETAILS_FALSE':
            return {
                ...state,
                loadingD: false,
                loading: false,
            };
        case 'CPANEL_DOMAIN':
            return {
                ...state,
                domain: action.payload.domain,
                loading: false,
            };
        case 'CPANEL_DOMAIN_FALSE':
            return {
                ...state,
                loading: false,
            };
        case 'CPANEL_LINK':
            return {
                ...state,
                cpanel_link: action.payload,
                cpanel_link_lodain: false,
            };
        case 'TOOLS__':
            return {
                ...state,
                tools_domains: action.payload[0].link,
                tools_wordpress: action.payload[1].link,
                tools_analytics: action.payload[2].link,
                tools_backup: action.payload[3].link,
                tools_filemanager: action.payload[4].link,
                tools_cron: action.payload[5].link,
                tools_email: action.payload[6].link,
                tools_links_lodaing: false,
            };
        case 'TOOLS__FALSE':
            return {
                ...state,
                tools_links_lodaing: false,
            };
        case 'DESTORY_AUTH':
            return {
                ...state,
                loadingD: true,
                loading: true,
                details: null,
                domain: null,
                cpanel_link: '',
                cpanel_link_lodain: true,
            };


        default:
            return state
    }
};
