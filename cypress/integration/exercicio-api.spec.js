/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('/users').then((response) => {

               expect(response.status).to.eq(200)

               expect(response.body[0]).to.have.property('id')
               expect(response.body[0]).to.have.property('name')
               expect(response.body[0]).to.have.property('username')
               expect(response.body[0]).to.have.property('email')

               expect(response.body[0].address).to.have.property('street')
               expect(response.body[0].address).to.have.property('city')

               expect(response.body[0]).to.have.property('phone')
               expect(response.body[0]).to.have.property('website')

          })

     });

     it('Deve listar usuários cadastrados', () => {
          cy.request('/users').then((response) => {
               expect(response.status).to.eq(200)
               expect(response.body).to.be.an('array')
               expect(response.body.length).to.be.greaterThan(0)
          })
     })

     it('Deve validar contrato de usuários', () => {
          cy.request('/users').then((response) => {
               expect(response.status).to.eq(200)
               expect(response.body[0]).to.have.property('id')
               expect(response.body[0]).to.have.property('name')
               expect(response.body[0]).to.have.property('email')
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          const usuario = {
               name: "Gabriel Henrique",
               username: "gabriel.qa",
               email: "gabriel@teste.com"
          }

          cy.request({
               method: 'POST',
               url: '/users',
               body: usuario
          }).then((response) => {
               expect(response.status).to.eq(201)
               expect(response.body).to.have.property('id')
          })
     });

     it('Deve validar um usuário com email inválido', () => {

          const usuario = {
               name: "Gabriel Henrique",
               username: "gabriel.qa",
               email: "gabriel.com.br" // email inválido
          }

          // regex para validar formato de email
          const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

          // validação
          expect(usuario.email).to.not.match(regexEmail)
     })
});

it('Deve editar um usuário previamente cadastrado', () => {
     const usuarioEditado = {
          name: "Gabriel Henrique Editado",
          email: "gabriel.editado@teste.com"
     }

     cy.request({
          method: 'PUT',
          url: '/users/1',
          body: usuarioEditado
     }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.name).to.eq(usuarioEditado.name)
          expect(response.body.email).to.eq(usuarioEditado.email)
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.request({
               method: 'DELETE',
               url: '/users/1'
          }).then((response) => {
               expect(response.status).to.eq(200)

          })
     });


});
