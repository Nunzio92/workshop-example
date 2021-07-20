import { Component } from '@angular/core';

@Component({
    selector: 'app-404',
    template: `
        <section id="main-not-found">
            <div class="container">
                <div class="row no-gutters">
                    <div class="col-lg-12">
                        <h4>Pagina non trovata...</h4>
                    </div>
                </div>
            </div>
        </section>
    `
})
export class PageNotFoundComponent {

    constructor() {
    }
}
