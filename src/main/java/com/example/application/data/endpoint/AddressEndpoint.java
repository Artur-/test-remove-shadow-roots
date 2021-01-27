package com.example.application.data.endpoint;

import com.example.application.data.CrudEndpoint;
import com.example.application.data.entity.Address;
import com.example.application.data.service.AddressService;
import com.vaadin.flow.server.connect.Endpoint;

import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
public class AddressEndpoint extends CrudEndpoint<Address, Integer> {

    private AddressService service;

    public AddressEndpoint(@Autowired AddressService service) {
        this.service = service;
    }

    @Override
    protected AddressService getService() {
        return service;
    }

}
