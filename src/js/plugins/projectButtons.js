import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'

const duration = 250

// Está função, tem como objetivo filtrar as imagens apresentadas pelo projeto pré-definido.
function filterByProject(project) {
    $('[wm-project]').each(function(index, element) {
        const isTarget = $(this).attr('wm-project') === project || project === null
        if(isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}


//Função para criar e adicionar os Botões.
$.fn.projectButtons = function () {


    const projects = new Set // Criando um conjunto, para não possuir repetição

    $('[wm-project]').each(function(index, element) {
        projects.add($(element).attr('wm-project'))
    })

    const btns = Array.from(projects).map(project => {
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(project)
        btn.click(element => filterByProject(project))
        return btn
    })

    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(element => filterByProject(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-project-buttons]').projectButtons()
})

