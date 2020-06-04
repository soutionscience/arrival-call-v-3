const localApi = 'http://localhost:3000/api'

export function restangularConfigFactory(RestangularProvider){
    RestangularProvider.setBaseUrl(localApi)
}