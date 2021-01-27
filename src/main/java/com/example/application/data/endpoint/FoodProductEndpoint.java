package com.example.application.data.endpoint;

import com.example.application.data.CrudEndpoint;
import com.example.application.data.entity.FoodProduct;
import com.example.application.data.service.FoodProductService;
import com.vaadin.flow.server.connect.Endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import javax.persistence.Lob;

@Endpoint
public class FoodProductEndpoint extends CrudEndpoint<FoodProduct, Integer> {

    private FoodProductService service;

    public FoodProductEndpoint(@Autowired FoodProductService service) {
        this.service = service;
    }

    @Override
    protected FoodProductService getService() {
        return service;
    }

}
