import GoogleOauth2Provider from 'torii/providers/GoogleOauth2Provider';


export default GoogleOauth2Provider.extend({
    fetch(data) {
        return data;
    }
})