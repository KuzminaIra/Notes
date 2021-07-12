package com.KuzminaIra.notes.database.repository;

import com.KuzminaIra.notes.database.entity.Group;
import com.KuzminaIra.notes.database.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> getByUser(User user);
    Group getByName(String name);
    Group getById(Long id);

    List<Group> findByUserOrderByName(User user);
    List<Group> findByUser(User user);
    List<Group> findByUserAndNameLikeOrderByName(User user, String name);
}
