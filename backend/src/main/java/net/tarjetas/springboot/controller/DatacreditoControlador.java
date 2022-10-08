package net.tarjetas.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.tarjetas.springboot.exception.ResourceNotFoundException;
import net.tarjetas.springboot.model.Datacredito;
import net.tarjetas.springboot.repository.DatacreditoRepositorio;

@CrossOrigin(origins = "http://localhost:3000") //direccion y puerto aplicacion react, para que la aplicacion REACT pueda hacer peticiones AJAX, a otra direccion fuera de su origen
@RestController
@RequestMapping("/api/")
public class DatacreditoControlador {

	@Autowired
	private DatacreditoRepositorio repositorio;
	
	// lista todos los Datacreditos
	@GetMapping("/Datacreditos")
	public List<Datacredito> Listar(){
		return repositorio.findAll();
	}		
	
	// create Datacredito rest api
	@PostMapping("/Datacreditos")
	public Datacredito Crear(@RequestBody Datacredito detalles) {           
            List<Datacredito> datos = repositorio.BuscarListaNegra(detalles.getTipo_documento(), detalles.getDocumento()) ;                      
            
            if (! datos.isEmpty() )   //ya existe , retorna el existente     
                return  datos.get(0);   		
                        
	    return repositorio.save(detalles);
	}
	
	// obtener  Datacredito por id rest api
	@GetMapping("/Datacreditos/{id}")
	public ResponseEntity<Datacredito> ObtenerporId(@PathVariable Long id) {
		Datacredito Datacredito = repositorio.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Datacredito no existe por Id :" + id));
		return ResponseEntity.ok(Datacredito);
	}
	
	//actualizar Datacredito rest api
	
	@PutMapping("/Datacreditos/{id}")
	public ResponseEntity<Datacredito> Actualizar(@PathVariable Long id, @RequestBody Datacredito detalles){
		Datacredito datos = repositorio.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Datacredito no existe por id :" + id));
		
		datos.setTipo_documento(detalles.getTipo_documento());
                datos.setDocumento(detalles.getDocumento());
		
		Datacredito resultado = repositorio.save(datos);
		return ResponseEntity.ok(resultado);
	}
	
	// borrar Datacredito rest api
	@DeleteMapping("/Datacreditos/{id}")
	public ResponseEntity<Map<String, Boolean>> Borrar(@PathVariable Long id){
		Datacredito datos = repositorio.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Datacredito no existe por id :" + id));
		
		repositorio.delete(datos);
                
                //arma respuesta para React, simple Json con un booleano con una etiqueta "deleted"
		Map<String, Boolean> respuesta = new HashMap<>();
		respuesta.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(respuesta);
	}
	
	
}
