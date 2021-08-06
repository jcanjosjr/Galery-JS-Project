import $ from 'jquery'

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}


// Está função irá ler todos os atributos que possuem [wm-include] tendo como parâmetro a tag.
function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(index, element) {
        const url = $(element).attr('wm-include')
        $.ajax({
            url,
            // Função callback quando a requisição for bem sucedida.
            success(data) {
                $(element).html(data)
                $(element).removeAttr('wm-include')
                
                // Invocando CallBacks para executar os Scripts HTML
                loadHtmlSuccessCallbacks.forEach(callback => callback(data))

                // Chamando novamente até não possuir mais wm-include a ser processado e depois removido.
                loadIncludes(element)
            }
        })
    })
}

loadIncludes()