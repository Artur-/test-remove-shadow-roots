package com.example.application.data.generator;

import com.vaadin.flow.spring.annotation.SpringComponent;

import com.example.application.data.service.PersonRepository;
import com.example.application.data.entity.Person;
import com.example.application.data.service.AddressRepository;
import com.example.application.data.entity.Address;
import com.example.application.data.service.BookRepository;
import com.example.application.data.entity.Book;
import com.example.application.data.service.FoodProductRepository;
import com.example.application.data.entity.FoodProduct;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.vaadin.artur.exampledata.DataType;
import org.vaadin.artur.exampledata.ExampleDataGenerator;

@SpringComponent
public class DataGenerator {

    @Bean
    public CommandLineRunner loadData(PersonRepository personRepository, AddressRepository addressRepository,
            BookRepository bookRepository, FoodProductRepository foodProductRepository) {
        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (personRepository.count() != 0L) {
                logger.info("Using existing database");
                return;
            }
            int seed = 123;

            logger.info("Generating demo data");

            logger.info("... generating 100 Person entities...");
            ExampleDataGenerator<Person> personRepositoryGenerator = new ExampleDataGenerator<>(Person.class,
                    LocalDateTime.of(2021, 1, 27, 0, 0, 0));
            personRepositoryGenerator.setData(Person::setId, DataType.ID);
            personRepositoryGenerator.setData(Person::setFirstName, DataType.FIRST_NAME);
            personRepositoryGenerator.setData(Person::setLastName, DataType.LAST_NAME);
            personRepositoryGenerator.setData(Person::setEmail, DataType.EMAIL);
            personRepositoryGenerator.setData(Person::setPhone, DataType.PHONE_NUMBER);
            personRepositoryGenerator.setData(Person::setDateOfBirth, DataType.DATE_OF_BIRTH);
            personRepositoryGenerator.setData(Person::setOccupation, DataType.OCCUPATION);
            personRepositoryGenerator.setData(Person::setImportant, DataType.BOOLEAN_10_90);
            personRepository.saveAll(personRepositoryGenerator.create(100, seed));

            logger.info("... generating 100 Address entities...");
            ExampleDataGenerator<Address> addressRepositoryGenerator = new ExampleDataGenerator<>(Address.class,
                    LocalDateTime.of(2021, 1, 27, 0, 0, 0));
            addressRepositoryGenerator.setData(Address::setId, DataType.ID);
            addressRepositoryGenerator.setData(Address::setStreet, DataType.ADDRESS);
            addressRepositoryGenerator.setData(Address::setPostalCode, DataType.ZIP_CODE);
            addressRepositoryGenerator.setData(Address::setCity, DataType.CITY);
            addressRepositoryGenerator.setData(Address::setState, DataType.STATE);
            addressRepositoryGenerator.setData(Address::setCountry, DataType.COUNTRY);
            addressRepository.saveAll(addressRepositoryGenerator.create(100, seed));

            logger.info("... generating 100 Book entities...");
            ExampleDataGenerator<Book> bookRepositoryGenerator = new ExampleDataGenerator<>(Book.class,
                    LocalDateTime.of(2021, 1, 27, 0, 0, 0));
            bookRepositoryGenerator.setData(Book::setId, DataType.ID);
            bookRepositoryGenerator.setData(Book::setImage, DataType.BOOK_IMAGE_URL);
            bookRepositoryGenerator.setData(Book::setName, DataType.BOOK_TITLE);
            bookRepositoryGenerator.setData(Book::setAuthor, DataType.FULL_NAME);
            bookRepositoryGenerator.setData(Book::setPublicationDate, DataType.DATE_OF_BIRTH);
            bookRepositoryGenerator.setData(Book::setPages, DataType.NUMBER_UP_TO_1000);
            bookRepositoryGenerator.setData(Book::setIsbn, DataType.EAN13);
            bookRepository.saveAll(bookRepositoryGenerator.create(100, seed));

            logger.info("... generating 100 Food Product entities...");
            ExampleDataGenerator<FoodProduct> foodProductRepositoryGenerator = new ExampleDataGenerator<>(
                    FoodProduct.class, LocalDateTime.of(2021, 1, 27, 0, 0, 0));
            foodProductRepositoryGenerator.setData(FoodProduct::setId, DataType.ID);
            foodProductRepositoryGenerator.setData(FoodProduct::setImage, DataType.FOOD_PRODUCT_IMAGE);
            foodProductRepositoryGenerator.setData(FoodProduct::setName, DataType.FOOD_PRODUCT_NAME);
            foodProductRepositoryGenerator.setData(FoodProduct::setEanCode, DataType.FOOD_PRODUCT_EAN);
            foodProductRepository.saveAll(foodProductRepositoryGenerator.create(100, seed));

            logger.info("Generated demo data");
        };
    }

}