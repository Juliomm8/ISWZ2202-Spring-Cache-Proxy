package com.udla.arquitectura.demo.repository;

import com.udla.arquitectura.demo.model.Producto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Proxy para intermediar el acceso al repositorio real de productos.
 */
@Repository
@Primary
public class ProductoRepositoryProxy implements ProductoRepository {

    private static final Logger logger = LoggerFactory.getLogger(ProductoRepositoryProxy.class);

    private final ProductoRepository repositorioReal;

    public ProductoRepositoryProxy(
            @Qualifier("repositorioProductoEnMemoria") ProductoRepository repositorioReal) {
        this.repositorioReal = repositorioReal;
    }

    @Override
    @Cacheable(cacheNames = "productos", key = "'todos'")
    public List<Producto> listarTodos() {
        logger.info("Proxy delega listarTodos al repositorio real");
        return repositorioReal.listarTodos();
    }

    @Override
    @Cacheable(cacheNames = "productoPorId", key = "#id")
    public Producto buscarPorId(Long id) {
        logger.info("Proxy delega buscarPorId({}) al repositorio real", id);
        return repositorioReal.buscarPorId(id);
    }
}
