import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log('Usuario TAB3', this.usuario);
  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) return;
    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
    console.log("Actualizar usuario", actualizado);
    if (actualizado) {
      this.uiService.presentToast("Usuario actualizado");
    } else {
      // toast con el error
      this.uiService.presentToast("No se pudo actualizar");
    }
  }

  logout() {
    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();
  }

}
