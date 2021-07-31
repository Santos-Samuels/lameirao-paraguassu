const form = document.getElementById('finishForm')
form.addEventListener('submit', function(e) {
    // impede o envio do form
    e.preventDefault()
    const whatsappURL = generateWhatsappMessage()
    window.location.href = whatsappURL
});

const loadProducts = (products) => {
    const productsContainer = document.querySelector('#products-container')
    
    productsContainer.innerHTML = ""
    products.forEach(product => {
        const html = `
            <article class="product p-4 rounded border shadow-md m-3" data-aos="fade-down">
                <iframe  class="w-100 rounded" src="${product.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <h3 class="text-center">${product.name}</h3>
                <p class="text-center fs-6">${product.color}</p>
                <p class="text-center fs-5 mb-0">De: <span class="text-decoration-line-through">${product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></p>
                <p class="text-center fs-3 fw-bolder">Por: <span class="">${product.promoPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></p>
                
                <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#productDetailModal" onclick="loadProductsDetailModal(${product.id}, products)">Ver detalhe</button>
            </article>
        `

        productsContainer.insertAdjacentHTML('beforeend', html)
    });
}

const loadProductsDetailModal = (productID, products) => {
    const productModalContainer = document.querySelector('#productDetailModalContainer')
    const productModalFooter = document.querySelector('#productDetailModalFooter')


    productModalContainer.innerHTML = ""
    products.forEach(product => {
        if(product.id == productID) {
            productModalContainer.innerHTML = `
                <div class="row m-3">
                    <div class="col-12 col-lg-6">
                        <iframe  class="w-100 rounded" src="${product.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    
                    <div class="col-12 col-lg-6">
                        <h3 class="text-center text-lg-start">${product.name}</h3>
                        <div class="border-top mb-2 p-2">
                            <p class="fs-6 mb-0"><span class="fw-bold">Material: </span> ${product.material}</p>
                            <p class="fs-6 mb-0"><span class="fw-bold">Tamanho: </span> ${product.size}</p>
                            <p class="fs-6 mb-0"><span class="fw-bold">Cor: </span> ${product.color}</p>
                            <p class="fs-6 mb-0"><span class="fw-bold">Frase: </span> ${product.name}</p>
                        </div>
                    </div>

                    <div class="mb-2 p-2 text-center border-top">
                        <p class="fs-6"><i class="bi bi-truck fs-5 me-1"></i> ENTREGA EM TODO BRASIL - <span class="fw-bold">Frete à combinar</p>
                        <p class="fs-6 mb-0 fw-bold text-complement-color-green">Você pode escolher outra frase com esse mesmo modelo de personalização!</p>
                    </div>

                    <p class="text-center fs-5 mb-0 border-top pt-2">De: <span class="text-decoration-line-through">${product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></p>
                    <p class="text-center fs-3 fw-bolder mb-0">Por: <span class="">${product.promoPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></p>
                </div>
            `
        }
    });

    productModalFooter.innerHTML = `
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Sair</button>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productFinishModal" data-bs-dismiss="modal" onclick="loadProductsFinishModal(${productID}, products)">Comprar</button>
    `
}

const loadProductsFinishModal = (productID, products) => {
    const productModalContainer = document.querySelector('#finishForm')
    const productModalFooter = document.querySelector('#productFinishModalFooter')
    
    productModalContainer.innerHTML = ""
    products.forEach(product => {
        if(product.id == productID) {
            productModalContainer.innerHTML = `
                <h4 class="border-bottom pb-1 mb-2 text-secondary">Informações da lameira</h4>
                <div class="row g-2 mb-4">
                    <div class="col-12">
                        <label class="form-label" for="lameiraName">Frase da lameira <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="text" name="lameiraName" id="lameiraName" placeholder="Ex: ${product.name}" value="${product.name}" required>
                    </div>
        
                    <div class="col-12">
                        <label class="form-label" for="lameiraColor">Cor da escrita <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="text" name="lameiraColor" id="lameiraColor" placeholder="Ex: ${product.color}" value="${product.color}" required>
                    </div>
                </div>
        
                <div class="row g-2 mb-4">
                    <div class="col-6">
                        <label class="form-label" for="lameiraSize">Tamanho da lameira <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="text" name="lameiraSize" id="lameiraSize" placeholder="Ex: ${product.size}" value="${product.size}" required>
                    </div>
        
                    <div class="col-6">
                        <label class="form-label" for="lameiraQuantity">Quantidade <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="number" name="lameiraQuantity" id="lameiraQuantity" placeholder="Ex: 2" min="1" value="1" required>
                    </div>
                </div>
        
                <h4 class="border-bottom pb-1 mb-2 text-secondary">Informações do cliente</h4>
                <div class="row g-2 mb-4">
                    <div class="col-12">
                        <label class="form-label" for="costumerName">Primeiro nome <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="text" name="costumerName" id="costumerName" placeholder="Ex: João" required>
                    </div>
        
                    <div class="col-12">
                        <label class="form-label" for="costumerPhone">Telefone <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="text" name="costumerPhone" id="costumerPhone" placeholder="Ex: 71 99652-7444" required>
                    </div>
                </div>
        
                <h4 class="border-bottom pb-1 mb-2 text-secondary">Informações de entrega</h4>
                <div class="row g-2">
                    <div class="col-12">
                        <label class="form-label" for="costumerAdress">Endereço <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="text" name="costumerAdress" id="costumerAdress" placeholder="Ex: Rua nova, bloco A, 234" required>
                    </div>
        
                    <div class="col-12">
                        <label class="form-label" for="costumerAdressDistrict">Bairro <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="text" name="costumerAdressDistrict" id="costumerAdressDistrict" placeholder="Ex: Esperança" required>
                    </div>
                </div>
        
                <div class="row g-2 mt-2">
                    <div class="col-8">
                        <label class="form-label" for="costumerAdressCity">Cidade <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="text" name="costumerAdressCity" id="costumerAdressCity" placeholder="Ex: Salvador" required>
                    </div>
        
                    <div class="col-4">
                        <label class="form-label" for="costumerAdressUF">UF <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="text" name="costumerAdressUF" id="costumerAdressUF" placeholder="Ex: BA" minlength ="2" maxlength ="2" required>
                    </div>
                </div>
        
                <div class="row mt-2">
                    <div class="col-12">
                        <label class="form-label" for="costumerAdressCEP">CEP <span class="text-primary" title="Campo obrigatório">*</span></label>
                        <input class="form-control" type="text" name="costumerAdressCEP" id="costumerAdressCEP" placeholder="Ex: 13165-000" required>
                    </div>
                </div>


                <div class="row mt-4 justify-content-end">
                    <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                        <button class="btn btn-primary w-100">Finalizar Pedido</button>
                    </div>
                </div>
            `
        }
    });
}


const generateWhatsappMessage = () => {
    var formData = document.getElementById("finishForm")
    var data = new FormData(formData)
    
    const message = `Olá, eu sou ${data.get("costumerName")} e gostei de uma lameira que vir no seu site.%0A%0A> INFORMAÇÕES DA LAMEIRA%0AFrase: *${data.get("lameiraName")}*%0ACor: *${data.get("lameiraColor")}*%0ATamanho: *${data.get("lameiraSize")}*%0AQuantidade: *${data.get("lameiraQuantity")}*%0A%0A> INFORMAÇÕES DO CLIENTE%0ANome: *${data.get("costumerName")}*%0ATelefone: *${data.get("costumerPhone")}*%0A%0A> INFORMAÇÕES DE ENTREGA%0AEndereço: *${data.get("costumerAdress")}*%0ABairro: *${data.get("costumerAdressDistrict")}*%0ACidade: *${data.get("costumerAdressCity")} - ${data.get("costumerAdressUF")}*%0ACidade: *${data.get("costumerAdressCEP")}*%0A`

    return `http://api.whatsapp.com/send?l=pt_BR&phone=5571996527444&text=${message}`
}